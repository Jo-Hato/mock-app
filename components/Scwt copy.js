app.component('scwt', {
  template:
  /*html*/
  `<h1>SCWT Excercise</h1>
  <p>Please choose the <u>written</u> color.</p>
  <p>Current Score: {{ score }}</p>

  <form class="review-form" @submit.prevent="onSubmit">

    <h2 style="text-shadow: 0 0 3px #FFFFFF, 0 0 5px #000000;"
      :class="{rred: word.color == 0}"
      :class="{ggreen: word.color == 1}"
      :class="{bblue: word.color == 2}"
      :class="{bblack: word.color == 3}"
      :class="{yyellow: word.color == 4}"
    >
      {{ word.written }}
    </h2>
    {{ word }}
    <div>!!!Debug Picked: {{ picked }}</div>
    <div>
      <input style="margin-left:1em;"
             class="red" type="radio" id="one" value="red" v-model="picked" />
      <input class="green" type="radio" id="two" value="green" v-model="picked" />
      <input class="blue" type="radio" id="three" value="blue" v-model="picked" />
      <input class="black" type="radio" id="four" value="black" v-model="picked" />
      <input class="yellow" type="radio" id="five" value="yellow" v-model="picked" />
    </div>

  </form>`,
  data() {
    return {

      colors: ["red", "green", "blue", "black", "yellow"],
      word: {"written": "", "color": null},
      score: 0,
      picked: null
    }
  },
  methods: {
    rngWord(){
        this.word.written = this.colors[Math.floor(Math.random() * 5)]
        this.word.color = Math.floor(Math.random() * 5)
    },
    onSubmit() {
      if (true) {
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