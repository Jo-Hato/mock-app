app.component('next-screen', {
    template:
    /*html*/
    `<div>
      <h1> {{ xLeft }}/4のアクテビティが完了しました。</h1>
      <button class="button" v-if="true" @click="skip()">Next</button>
    </div>`,
    props: {
      eventNum: {
        type: Boolean,
        required: true
      },
    },
    methods: {
        skip() {
          this.$emit('skip')
        }
    },
    data() {
      return {
        xLeft: 0
      }
    },
    beforeMount(){
      if (this.eventNum == 4) {
        this.xLeft = 1
      } else if (this.eventNum == 6) {
        this.xLeft = 2
      } else if (this.eventNum == 8) {
        this.xLeft = 3
      } else if (this.eventNum == 10) {
        this.xLeft = 4
      }
    }
})