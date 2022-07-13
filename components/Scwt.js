app.component('scwt', {
  template:
  /*html*/
  `<h1>SCWT Excercise</h1>
  <p>Please choose the <b>written</b> color.</p>
  <p>Current Score: {{ score }}</p>

  <form class="review-form" @submit.prevent="onSubmit">

    <div>Picked: {{ picked }}</div>
    <div>
      <input style="margin-left:1em;" class="red" type="radio" id="one" value="red" v-model="picked" />
      <input class="green" type="radio" id="two" value="green" v-model="picked" />
      <input class="blue" type="radio" id="three" value="blue" v-model="picked" />
      <input class="black" type="radio" id="four" value="black" v-model="picked" />
      <input class="yellow" type="radio" id="five" value="yellow" v-model="picked" />
    </div>

  </form>`,
  data() {
    return {
      rng_text: "",
      input: null,
      score: 0,

      picked: 0
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