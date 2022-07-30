app.component('lorem-ipsum', {
  template:
  /*html*/
  `<div>
    <h1>Texting Excercise</h1>
    <p>以下に表示される文章をお書きください。</p>
    <h2 v-show="(eventNum != 3) && internalStateNum == 1" style="color: red;">残り{{ sec }}秒</h2>
    <p v-show="debugMode" style="color: fuchsia;">DEBUG: {{ sec }} second(s) left</p>
    <p>得点: {{ score }}</p>

    <div class="box">
      <label style="font-size: 2em; color: white;" for="input"><b>{{ (internalStateNum == 0) ? "ここにテキストが表示されます。準備ができたら「スタート」を押してください。" : rng_text}}</b></label>
      <p v-show="typo" style="color: red;">誤字があります! 答えを訂正してください!</p>
      <input :disabled="internalStateNum == 0" id="input" v-model="input"><br>

      <button v-if="internalStateNum == 0" class="button" @click="startLorem()">Start</button>
      <button :disabled="internalStateNum == 0 || input == ''" class="button" @click="submitForm()">Submit</button>
      <button class="button" v-if="debugMode" @click="skip()" style="color: fuchsia;">Force Next</button>
    </div>
  </div>`,
  props: {
    debugMode: {
      type: Boolean,
      required: true
    },
    //It might be better not to get the accels/gyros data from the parent component,
    //but I have faith in Vue's speed, for no reason. Should be fine. I hope...
    accels: {
      type: Object,
      required: true
    },
    gyros: {
      type: Object,
      required: true
    },
    touchNum: {
      type: Number,
      required: true
    },
    delNum: {
      type: Number,
      required: true
    },
    eventNum: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      internalStateNum : 0,
      sec : 0,
      texts: [
        "lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "donec eget risus in nisi cursus",
        "pellentesque in turpis scelerisque",
        "iaculis velit in auctor nulla"],
      rng_text: "",
      input: null,
      score: 0,
      sensorsData: {
        "started": null,
        "accels": [],
        "gyros": [],
        "touches": [],
        "dels": []
      },
      prevLen: 0,
      rec: null,
      timer: null,
      audioTimer: new Audio('./assets/timer.wav'),
      typo: false,
    }
  },
  watch: {
    input() {
      this.$emit('touch')
      if (this.prevLen > this.input.length) {
        this.$emit('del-key')
      }
      this.prevLen = this.input.length
    }
  },
  methods: {
    playSoundTimer() {
      this.audioTimer.play()
    },
    rngText(str){
      oldStr = str
      newStr = this.texts[Math.floor(Math.random() * 5)]
      while (oldStr == newStr) {
        newStr = this.texts[Math.floor(Math.random() * 5)]
      }
      this.rng_text = newStr
    },
    submitForm() {
      if (this.input != this.rng_text) {
        //alert('You have typo(s) in your submission.\nPlease revise you text and resubmit.')
        this.typo = true
        return
      }

      this.typo = false
      this.rngText(this.input)
      this.input = ""
      this.score++
      if (this.score == 5) {
        clearInterval(this.rec)
        clearInterval(this.timer)
        this.audioTimer.pause()
        this.$emit('sensors-data-submitted', this.sensorsData)
      }
    },
    startLorem(){
      if(this.eventNum != 3){
        this.playSoundTimer()
      }
      this.internalStateNum++
      //Start recording motions
      this.rec = setInterval(this.record, 50)
      this.sensorsData.started = Date.now()

      //startTimer
      this.timer = setInterval(this.countDown, 1000)
    },
    countDown() {
      this.sec--
      if (this.sec == 0){
        clearInterval(this.rec)
        clearInterval(this.timer)
        this.audioTimer.pause()
        this.internalStateNum++
        this.$emit('sensors-data-submitted', this.sensorsData)
      }
    },
    record() {
      if (this.internalStateNum == 1) {
        //How the actual fuck this.sensorsData.accels.push(this.accels) don't work correctly, but this works?!
        //https://www.youtube.com/watch?v=8DLZ8Wo7hKo
        //I hate this and this made me stuck for like 6+ hours. Fuck this shit.

        //this.sensorsData.accels.push(this.accels)
        //this.sensorsData.gyros.push(this.gyros)
        this.sensorsData.accels.push({"x": this.accels.x, "y": this.accels.y, "z": this.accels.z})
        this.sensorsData.gyros.push({"x": this.gyros.x, "y": this.gyros.y, "z": this.gyros.z})
        this.sensorsData.touches.push(this.touchNum)
        this.sensorsData.dels.push(this.delNum)
      }
    },
    skip() {
      clearInterval(this.rec)
      clearInterval(this.timer)
      this.sensorsData = {
        "started": Date.now(),
        "accels": [{x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}, {x: 2, y: 2, z: 2}, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}, {x: 2, y: 2, z: 2}, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}, {x: 2, y: 2, z: 2}],
        "gyros": [{x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}, {x: 2, y: 2, z: 2}, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}, {x: 2, y: 2, z: 2}, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}, {x: 2, y: 2, z: 2}],
        "touches": [0, 2, 5, 8, 9, 11],
        "dels": [1, 4, 12, 12, 15, 20]
      }
      this.$emit('sensors-data-submitted', this.sensorsData)
    },
  },
  beforeMount(){
    this.rngText(this.input)
    this.score = 0
    this.sec = 60
    this.input = ""
    this.audioTimer.loop = false
    this.audioTimer.load()
    this.typo = false
  },
  beforeUnmount(){
    //might be redundant, but I don't care. Better worry than sorry.
    this.audioTimer.loop = false
    this.audioTimer.pause()
    clearInterval(this.rec)
    clearInterval(this.timer)
  }
})