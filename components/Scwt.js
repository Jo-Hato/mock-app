app.component('scwt', {
  template:
  /*html*/
  `<h1>SCWT Excercise</h1>
  <p>Please choose the <b>written</b> color.</p>
  <p>Current Score: {{ score }}</p>

  <form class="review-form" @submit.prevent="onSubmit">

    <input id="input" v-model="input"><br>

    <input class="button" type="submit" value="Submit">

  </form>`,
  data() {
    return {
      rng_text: "",
      input: null,
      score: 0
    }
  },
  methods: {
    rngWord(){
    },
    onSubmit() {
      if (null) {
        alert('You have typo(s) in your submission.\nPlease revise you text and resubmit.')
        return
      }

      /*let productReview = {
        lorem: this.input,
      }
      this.$emit('review-submitted', productReview)*/

      this.input = ""
      this.score++
      if (this.score == 5) {
        alert("GO NEXT EVENT")
      }
      //addScore, more than 25
    }
  },
  beforeMount(){
    this.rngWord()
    this.score = 0
  }
})