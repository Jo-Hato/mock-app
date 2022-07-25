app.component('next-screen', {
    template:
    /*html*/
    `<div>
      <h1>Excercise Finished!</h1>
      <button class="button" v-if="true" @click="skip()">Next</button>
    </div>`,
    methods: {
        skip() {
          this.$emit('skip')
        }
      }
})