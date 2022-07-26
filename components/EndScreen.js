app.component('end-screen', {
    template:
    /*html*/
    `<div>
      <h1>The End of Data Collection</h1>
      <p>Thank you for your participation! :D</p>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <p>{{ runData }}</p>
    </div>`,
    props: {
        runData: {
            type: Object,
            required: true
        }
    },
    data() {
      return {
      }
    },
    methods: {
    }
  })