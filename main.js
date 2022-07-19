const app = Vue.createApp({
    data() {
        return {
            eventNum: 0,
            experimentData: [],
            SENSORFREQ: 20,
            accels: [0, 0, 0],
            gyros: [0, 0, 0],
        }
    },
    methods: {
        addInitialForm(initialForm) {
            this.experimentData.push(initialForm)
            this.eventNum++
        },
    }
})
