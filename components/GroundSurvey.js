app.component('ground-survey', {
  template:
  /*html*/
  `<div>
    <h1>Emotion Survey</h1>
    <p>How do you feel?</p>
    <p>1: low, 5: high</p>

    <div class="box">
      <!-- Dyamn, should've used Vue's loop... -->
      <label for="tired">Tired:</label>
      <select @click="touched" id="tired" v-model.number="tired">
        <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
      </select>
      <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
      <label for="happy">Happy:</label>
      <select @click="touched" id="happy" v-model.number="happy">
        <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
      </select>
      <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
      <label for="stress">Stress:</label>
      <select @click="touched" id="stress" v-model.number="stress">
        <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
      </select>
      <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
      <label for="energy">Energy:</label>
      <select @click="touched" id="energy" v-model.number="energy">
        <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
      </select>
      <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
      <label for="angry">Angry:</label>
      <select @click="touched" id="angry" v-model.number="angry">
        <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
      </select>
      <p style="margin: 0; padding: 0; height: 0.5em;">&nbsp</p>
      <label for="interested">Interested:</label>
      <select @click="touched" id="interested" v-model.number="interested">
        <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
      </select>

      <button class="button" :disabled="this.tired === null || this.happy === null || this.stress === null || this.energy === null || this.angry === null || this.interested === null" @click="submitForm()">Submit</button>
      <button class="button" v-if="debugMode" @click="skip()" style="color: fuchsia;">Force Next</button>
    </div>
  </div>`,
  props: {
    debugMode: {
      type: Boolean,
      required: true
    }
  },
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
    touched() {
      this.$emit('touch')
    },
    submitForm() {
      let truthForm = {
        tired: this.tired,
        happy: this.happy,
        stress: this.stress,
        energy: this.energy,
        angry: this.angry,
        interested: this.interested,
      }
      this.$emit('ground-truth-submitted', truthForm)
    },
    skip() {
      let truthForm = {
        tired: 999,
        happy: 999,
        stress: 999,
        energy: 999,
        angry: 999,
        interested: 999,
      }
      this.$emit('ground-truth-submitted', truthForm)
    }
  }
})