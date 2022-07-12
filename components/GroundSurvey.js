app.component('ground-survey', {
  template:
  /*html*/
  `<h1>Emotion Survey</h1>
  <p>How do you feel?<br>
  1: low, 3: mid, 5: high</p>

  <form class="review-form" @submit.prevent="onSubmit">

    <!-- Dyamn, should've used Vue's loop... -->
    <label for="tired">Tired:</label>
    <select id="tired" v-model.number="tired">
      <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
    </select>
    <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
    <label for="happy">Happy:</label>
    <select id="happy" v-model.number="happy">
      <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
    </select>
    <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
    <label for="stress">Stress:</label>
    <select id="stress" v-model.number="stress">
      <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
    </select>
    <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
    <label for="energy">Energy:</label>
    <select id="energy" v-model.number="energy">
      <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
    </select>
    <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
    <label for="angry">Angry:</label>
    <select id="angry" v-model.number="angry">
      <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
    </select>
    <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
    <label for="interested">Interested:</label>
    <select id="interested" v-model.number="interested">
      <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
    </select>


    <input class="button" type="submit" value="Submit">  

  </form>`,
  data() {
    return {
      tired: null,
      happy: null,
      stress: null,
      energy: null,
      angry: null,
      interested: null
    }
  },
  methods: {
    onSubmit() {
      if (this.tired === null || this.happy === null || this.stress === null || this.energy === null || this.angry === null || this.interested === null) {
        alert('Review is incomplete. Please fill out every field.')
        return
      }

      let productReview = {
        tired: this.tired,
        happy: this.happy,
        stress: this.stress,
        energy: this.energy,
        angry: this.angry,
        interested: this.interested,
      }
      this.$emit('review-submitted', productReview)

      //!!!Increase event number
    }
  }
})