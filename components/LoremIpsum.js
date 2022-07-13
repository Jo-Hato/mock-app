app.component('lorem-ipsum', {
  template:
  /*html*/
  `<h1>Texting Excercise</h1>
  <p>Please write the text below.</p>
  <p>Current Score: {{ score }}</p>

  <form class="review-form" @submit.prevent="onSubmit">

    <label style="font-size: 2em;" for="input"><b>{{ rng_text }}</b></label>
    <input id="input" v-model="input"><br>

    <input class="button" type="submit" value="Submit">

  </form>`,
  data() {
    return {
      texts: [
        "lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "donec eget risus in nisi cursus placerat",
        "pellentesque in turpis scelerisque",
        "iaculis velit in auctor nulla"],
      rng_text: "",
      input: null,
      score: 0
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
    onSubmit() {
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
    }
  },
  beforeMount(){
    this.rngText(this.input)
    this.score = 0
  }
})