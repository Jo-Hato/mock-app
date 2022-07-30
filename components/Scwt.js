app.component('scwt', {
  template:
  /*html*/
  `<div>
    <h1>SCWT Excercise</h1>
    <p v-if="internalStateNum == 0">2秒ごとに変わるメッセージに対応する色のついたボタンを押してください。<br>
    最初のフェーズでは、<u>フォントの色</u>を選択する必要があります。<br><br>
      <u>25点以上の得点を目指してください。</u><br>
      準備ができたら「スタート」を押してください。</p><br>
    <p v-if="internalStateNum == 2">このフェーズでは、<u>書き言葉の色</u>を選択する必要があります。<br></p>
    <h2 style="color: red;" v-if="internalStateNum == 1 || internalStateNum == 3">残り{{ sec }}秒</h2>
    <p>得点: {{ score }}/25</p>

    <div class="box">
      <p v-if="internalStateNum == 0 && phase == 0" style="color: white;"><u>フォントの色</u>を選んでください。</p>
      <p v-if="internalStateNum == 1" style="color: white;"><u>フォントの色</u>を選んでください。</p><br>
      <p v-if="internalStateNum == 3" style="color: white;"><u>書き言葉の色</u>を選んでください。</p><br>
      <h2 style="text-shadow: 0 0 3px #FFFFFF, 0 0 5px #000000;" :class="word.class[word.color]">
        {{ word.written }}
      </h2>
      <div>
        <input :disabled="internalStateNum == 0 || internalStateNum == 2" v-model="picked" @click="onSubmit(color)" v-for="(color, index) in colors" :class="color" type="radio" :id="index" :value="color"/>
      </div>
      <button v-if="internalStateNum == 0 || internalStateNum == 2" class="button" @click="startScwt()">Start</button>
      <button class="button" v-if="debugMode" @click="skip()" style="color: fuchsia;">Force Next</button>
    </div>
  </div>`,
  props: {
    debugMode: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      colors: ["red", "green", "blue", "black", "yellow"],
      word: {"written": "", "color": null, class: ["rred", "ggreen", "bblue", "bblack", "yyellow"]},
      score: 0,
      picked: null,
      writtenOrFont: ["font", "written"],
      rng: null,
      internalStateNum: 0,
      phase: 0,
      sec: 0,
      timer: null,
      scrambleSec: 2,
      scrambleTimer: null,
      prevColor: null,
      prevWord: null,
      audio: new Audio('./assets/error.wav')
    }
  },
  methods: {
    playSoundError() {
      this.audio.loop = false
      this.audio.play()
    },
    startScwt(){
      this.rngWord()
      this.internalStateNum++
      //startTimer
      this.timer = setInterval(this.countDown, 1000)
      this.scrambleTimer = setInterval(this.scrambleCountDown, 1000)
    },
    countDown() {
      this.sec--
      if (this.sec == 0){
        clearInterval(this.timer)
        this.internalStateNum++
        this.sec = 60
        this.phase = 1
        clearInterval(this.scrambleTimer)
        this.scrambleSec = 2
        
        if (this.internalStateNum == 4)
        this.skip()
      }
    },
    scrambleCountDown() {
      if (this.scrambleSec == 1) {
        this.rngWord()
        return
      }
      this.scrambleSec--
    },
    rngWord(){
        this.word.written = this.colors[Math.floor(Math.random() * 5)]
        this.word.color = Math.floor(Math.random() * 5)
        if (this.phase == 0) {
          this.rng = 0 //font
        } else {
          this.rng = 1 //word
        }

        //To avoid duplicate word-fontColor in a row
        if (this.word.color == this.prevColor && this.word.written == this.prevWord) {
          this.rngWord()
        }
        this.prevColor = this.word.color
        this.prevWord = this.word.written
        this.scrambleSec = 2
    },
    onSubmit(color) {
      if (this.phase == 0) { //font
        if (color == this.colors[this.word.color]) {
          this.score++
        } else {
          this.score--
          this.playSoundError()
        }
      } else { //word
        if (color == this.word.written) {
          this.score++
        } else {
          this.score--
          this.playSoundError()
        }
      }

      this.rngWord()
    },
    skip() {
      clearInterval(this.timer)
      this.$emit('skip')
    }
  },
  beforeMount(){
    this.rngWord()
    this.score = 0
    this.sec = 60
    this.picked = null
  }
})