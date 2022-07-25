app.component('subtraction', {
  template:
  /*html*/
  `<div>
    <h1>Math Excercise</h1>
    <p>Please enter the answer below.</p>
    <p style="color: red;">{{ sec }} second(s) left</p>
    <p>Current Score: {{ score }}</p>

    <div class="box">
      <h2 v-if="internalStateNum == 0">The equation will be displayed here. Press 'start' when ready.</h2>
      <h2 v-else>{{ num0 }} - {{ num1 }} = ?</h2><br>
      {{this.internalStateNum}}
      
      <label for="input">Input your answer here:</label>
      <input :disabled="internalStateNum == 0" id="input" v-model="input" type="number" pattern="\d"><br>

      <button v-if="internalStateNum == 0" class="button" @click="startCalc()">Start</button>
      <button :disabled="internalStateNum == 0" class="button" @click="onSubmit()">Submit</button>
      <button class="button" v-if="debugMode" @click="skip()">Force Next</button>

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
    }
  },
  methods: {
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
        console.log("*!!!Anoyying beep*")
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
  },
  beforeUnmount(){
    //might be redundant, but I don't care. Better worry than sorry.
    clearInterval(this.rec)
    clearInterval(this.timer)
  }
})