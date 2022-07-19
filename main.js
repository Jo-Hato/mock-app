const app = Vue.createApp({
    data() {
        return {
            eventNum: 0,
            experimentData: [],
            SENSORFREQ: 20,
            accels: [0, 0, 0],
            gyros: [0, 0, 0],
            
            //is_running : false,
            //demo_button : document.getElementById("start_demo"),
        }
    },
    methods: {
        addInitialForm(initialForm) {
            this.experimentData.push(initialForm)
            this.eventNum++
        },
    }
})
