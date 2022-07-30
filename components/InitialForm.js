app.component('initial-form', {
    template:
    /*html*/
    `<div>
      <h1>Basic Information</h1>
      <p>基本情報を入力してください。</p>

      <div class="box">
        <label for="name">ニックネーム/ID (半角英数字) (任意):</label><br>
        <input id="name" v-model="name"><br>

        <label for="age">年齢:</label><br>
        <input id="age" type="number" step="1" pattern="\d" v-model.number="age"><br>

        <label for="gender">性別:</label><br>
        <select id="gender" v-model="gender" @click="touched()">
          <option>男性</option>
          <option>女性</option>
          <option>その他</option>
        </select><br> 
    
        <button class="button" @click="submitForm()" :disabled="this.age === null || this.gender === null">Submit</button>
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
        id: null,
        name: '',
        age: null,
        gender: null,
        initialForm: {},
        namePrevLen: 0,
        agePrevLen: 0,
      }
    },
    watch: {
      name() {
        this.$emit('touch')
        if (this.namePrevLen > this.name.length) {
          this.$emit('del-key')
        }
        this.namePrevLen = this.name.length
      },
      age() {
        this.$emit('touch')
        if (this.agePrevLen > String(this.age).length) {
          this.$emit('del-key')
        }
        this.agePrevLen = String(this.age).length
      }
    },
    methods: {
      touched() {
        this.$emit('touch')
      },
      submitForm() {
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