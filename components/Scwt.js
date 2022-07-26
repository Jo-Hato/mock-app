app.component('scwt', {
  template:
  /*html*/
  `<div>
    <h1>SCWT Excercise</h1>
    <p v-if="internalStateNum == 0">Please choose the <u>the color of the font/written-word</u> above the colored boxes.<br> Press 'Start' when ready.</p><br>
    <h2 style="color: red;" v-if="internalStateNum == 1">{{ sec }} second(s) left</h2>
    <p>Current Score: {{ score }}/30</p>

    <div class="box">
      <p v-if="internalStateNum == 0" style="color: white;">Please choose the <u>written/font color</u>.</p>
      <p v-if="internalStateNum == 1" style="color: white;">Please choose the <u>{{ writtenOrFont[rng] }} color</u>.</p><br>
      <h2 style="text-shadow: 0 0 3px #FFFFFF, 0 0 5px #000000;" :class="word.class[word.color]">
        {{ word.written }}
      </h2>
      <div>
        <input :disabled="internalStateNum == 0" v-model="picked" @click="onSubmit(color)" v-for="(color, index) in colors" :class="color" type="radio" :id="index" :value="color"/>
      </div>
      <button v-if="internalStateNum == 0" class="button" @click="startScwt()">Start</button>
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
      writtenOrFont: ["written", "font"],
      rng: null,
      internalStateNum: 0,
      sec: 0,
      timer: null,
    }
  },
  methods: {
    startScwt(){
      this.rngWord()
      this.internalStateNum++
      //startTimer
      this.timer = setInterval(this.countDown, 1000)
    },
    countDown() {
      this.sec--
      if (this.sec == 0){
        clearInterval(this.timer)
        this.internalStateNum++
        this.skip()
      }
    },
    rngWord(){
        this.word.written = this.colors[Math.floor(Math.random() * 5)]
        this.word.color = Math.floor(Math.random() * 5)
        this.rng = Math.floor(Math.random() * 2)
    },
    onSubmit(color) {
      //console.log("COLOR ", color)
      //console.log(this.word)
      if (this.word.written == this.colors[this.word.color]) {
        if (color == this.colors[this.word.written] || color == this.colors[this.word.color]) {
          this.score++
        } else {
          this.score--
        }
      } else {
        if (this.rng == 1) { //Font color
          if (color == this.colors[this.word.color]) {
            this.score++
          } else {
            this.score--
          }
        } else { //Written color
          if (color != this.colors[this.word.color]) {
            this.score++
          } else {
            this.score--
          }
        }
      }

      if (this.score == 30) {
        this.skip()
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