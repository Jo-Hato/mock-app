app.component('initial-form', {
    template:
    /*html*/
    `<div>
    <h1>Basic Information</h1>
    <p>Please enter you basic information.</p>

    <form class="review-form" @submit.prevent="onSubmit">
      <label for="id">Name (or Nickname):</label><br>
      <input id="id" v-model="id"><br>

      <label for="age">Age:</label><br>
      <input age="age" type="number" step="1" pattern="\d" v-model.number="age"><br>

      <label for="gender">Gender:</label><br>
      <select id="gender" v-model="gender">
        <option>Male</option>
        <option>Female</option>
      </select><br> 
  
      <input class="button" type="submit" value="Submit">  
  
    </form>
    <div>`,
    data() {
      return {
        id: '',
        age: null,
        gender: null,
        initialForm: {},
      }
    },
    methods: {
      onSubmit() {
        if (this.id === '' || this.age === null || this.gender === null) {
          alert('Info is incomplete. Please fill out every field.')
          return
        }
        let initialForm = {
          id: this.id,
          age: this.age,
          gender: this.gender
        }
        this.$emit('initial-form-submitted', initialForm)
      },
    }
  })