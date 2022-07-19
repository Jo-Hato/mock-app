app.component('scwt', {
  template:
  /*html*/
  `<h1>SCWT Excercise</h1>
  <p>Please choose the <u>{{ writtenOrFont[rng] }} color</u>.</p>
  <p>Current Score: {{ score }}</p>

  <form class="review-form">

    <h2 style="text-shadow: 0 0 3px #FFFFFF, 0 0 5px #000000;" :class="word.class[word.color]">
      {{ word.written }}
    </h2>

    <div>
      <input v-model="picked" @click="onSubmit(color)" v-for="(color, index) in colors" :class="color" type="radio" :id="index" :value="color"/>
    </div>

  </form>`,
  data() {
    return {
      colors: ["red", "green", "blue", "black", "yellow"],
      word: {"written": "", "color": null, class: ["rred", "ggreen", "bblue", "bblack", "yyellow"]},
      score: 0,
      picked: null,
      writtenOrFont: ["written", "font"],
      rng: null
    }
  },
  methods: {
    rngWord(){
        this.word.written = this.colors[Math.floor(Math.random() * 5)]
        this.word.color = Math.floor(Math.random() * 5)
        this.rng = Math.floor(Math.random() * 2)
    },
    onSubmit(color) {
      if (this.rng == 1) {
        if (color == this.colors[this.word.color]) {
          this.score++
        } else {
          this.score--
        }
      } else {
        if (color != this.colors[this.word.color]) {
          this.score++
        } else {
          this.score--
        }
      }

      if (this.score == 5) {
        alert("GO NEXT EVENT")
      }
      this.rngWord()
    }
  },
  beforeMount(){
    this.rngWord()
    this.score = 0
    this.picked = null
  }
})