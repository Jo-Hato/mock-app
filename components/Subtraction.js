app.component('subtraction', {
  template:
  /*html*/
  `<div>
    <h1>Math Excercise</h1>
    <p>Please enter the answer below.</p>
    <h2 style="color: red;" v-show="internalStateNum == 1">{{ sec }} second(s) left</h2>
    <p>Current Score: {{ score }}</p>

    <div class="box">
      <h2 v-if="internalStateNum == 0" style="color: white;">The equation will be displayed here. Press 'start' when ready.</h2>
      <h2 v-else style="color: white;">{{ num0 }} - {{ num1 }} = ?</h2><br>
      
      <label for="input">Input your answer here:</label>
      <input :disabled="internalStateNum == 0" id="input" v-model="input" type="number" pattern="\d"><br>

      <button v-if="internalStateNum == 0" class="button" @click="startCalc()">Start</button>
      <button :disabled="internalStateNum == 0 || input === ''" class="button" @click="onSubmit()">Submit</button>
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
      num0: 0,
      num1: 0,
      input: null,
      score: 0,
      internalStateNum: 0,
      sec : 0,
      prevLen: 0,
      timer: null,
      audio: new Audio('./assets/error.wav')
    }
  },
  methods: {
    playSoundError() {
      this.audio.loop = false
      this.audio.play()
    },
    startCalc(){
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
    skip() {
      //SKIP
      clearInterval(this.timer)
      this.$emit('skip')
    },
    rngInt() {
      this.num0 = 1000 + Math.floor(Math.random() * 8999)
      this.num1 = 10 + Math.floor((Math.random()) * 89)

      if (this.num1 %2 == 0) {//generated number is even
         if (this.num1 == 89) {
          this.num1  = this.num1 -1
         } 
         else {
          this.num1  = this.num1 +1
         }
      }
    },
    onSubmit() {
      if (this.input != (this.num0 - this.num1)) {
        this.playSoundError()
        this.score--
        this.rngInt()
        this.input = ""
        return
      }

      this.rngInt()
      this.input = ""
      this.score++

      if (this.score == 7) {
        this.skip()
      }
    }
  },
  beforeMount(){
    this.rngInt()
    this.score = 0
    this.sec = 60
    this.input = ""
  },
  beforeUnmount(){
    //might be redundant, but I don't care. Better worry than sorry.
    clearInterval(this.timer)
  }
})