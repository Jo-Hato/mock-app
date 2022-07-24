app.component('lorem-ipsum', {
  template:
  /*html*/
  `<div>
    <h1>Texting Excercise</h1>
    <p>Please write the text below.</p>
    <p v-show="isStress || debugMode" style="color: red;">{{ sec }} second(s) left</p>
    <p>Current Score: {{ score }}</p>

    <div class="box">
      <label style="font-size: 2em;" for="input"><b>{{ (internalStateNum == 0) ? "The text will be displayed here. Press 'start' when ready." : rng_text}}</b></label>
      <input id="input" v-model="input"><br>

      <button :disabled="internalStateNum == 1" class="button" @click="startLorem()">Start</button>
      <button :disabled="internalStateNum == 0" class="button" @click="submitForm()">Submit</button>
      <button class="button" v-if="debugMode" @click="skip()">Force Next</button>
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
    }
  },
  data() {
    return {
      internalStateNum : 0,
      isStress : true,
      sec : 0,
      texts: [
        "lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "donec eget risus in nisi cursus placerat",
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
        alert('You have typo(s) in your submission.\nPlease revise you text and resubmit.')
        return
      }

      /*let productReview = {
        lorem: this.input,
      }
      this.$emit('review-submitted', productReview)*/
      this.rngText(this.input)
      this.input = ""
      this.score++
      if (this.score == 5) {
        alert("GO NEXT EVENT")
      }
      //addScore, up til 5, and then move to next eventNumber
    },
    startLorem(){
      this.internalStateNum++
      //Start recording motions
      this.rec = setInterval(this.record, 50)
      this.sensorsData.started = Date.now()

      //startTimer
      this.timer = setInterval(this.countDown, 1000)
    },
    countDown() {
      this.sec--
      if (this.sec == 1){
        clearInterval(this.rec)
        clearInterval(this.timer)
        setTimeout(() => {
          this.$emit('sensors-data-submitted', this.sensorsData)
        }, 1000);
      }
    },
    record() {
      this.sensorsData.accels.push(this.accels)
      this.sensorsData.gyros.push(this.gyros)
      this.sensorsData.touches.push(this.touchNum)
      this.sensorsData.dels.push(this.delNum)
    },
    skip() {
      let sensorsData = {
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
    this.sec = 5
  },
})