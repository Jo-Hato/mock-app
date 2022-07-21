app.component('initial-form', {
    template:
    /*html*/
    `<div>
      <h1>Basic Information</h1>
      <p>Please enter you basic information.</p>

      <div class="box">
        <label for="name">Name (or Nickname):</label><br>
        <input id="name" v-model="name"><br>

        <label for="age">Age:</label><br>
        <input age="age" type="number" step="1" pattern="\d" v-model.number="age"><br>

        <label for="gender">Gender:</label><br>
        <select id="gender" v-model="gender">
          <option>Male</option>
          <option>Female</option>
        </select><br> 
    
        <button class="button" @click="submitForm()">Submit</button>
        <button class="button" v-if="debugMode" @click="skip()">Force Next</button>
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
        id: null,
        name: '',
        age: null,
        gender: null,
        initialForm: {},
      }
    },
    methods: {
      submitForm() {
        if (this.name === '' || this.age === null || this.gender === null) {
          alert('Info is incomplete. Please fill out every field.')
          return
        }
        let initialForm = {
          id: Date.now(),
          name: this.name,
          age: this.age,
          gender: this.gender
        }
        this.$emit('initial-form-submitted', initialForm)
      },
      skip() {
        let initialForm = {
          id: Date.now(),
          name: "Sudo san",
          age: 9999,
          gender: "God"
        }
        this.$emit('initial-form-submitted', initialForm)
      }
    }
  })