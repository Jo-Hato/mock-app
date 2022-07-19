app.component('subtraction', {
  template:
  /*html*/
  `<h1>Math Excercise</h1>
  <p>Please enter the answer below.</p>
  <p>Current Score: {{ score }}</p>

  <form class="review-form" @submit.prevent="onSubmit">
    <h2>{{ num0 }} - {{ num1 }} = ?</h2>
    <label for="input">Input your answer here:</label>
    <input id="input" v-model="input" type="number" pattern="\d"><br>

    <input class="button" type="submit" value="Submit">

  </form>`,
  data() {
    return {
      num0: 0,
      num1: 0,
      input: null,
      score: 0
    }
  },
  methods: {
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


      /*let productReview = {
        lorem: this.input,
      }
      this.$emit('review-submitted', productReview)*/
      this.rngInt()
      this.input = ""
      this.score++

      if (this.score == 7) {
        alert("GO NEXT EVENT")
      }
      //addScore, up til 5, and then move to next eventNumber
    }
  },
  beforeMount(){
    this.rngInt()
    this.score = 0
  }
})