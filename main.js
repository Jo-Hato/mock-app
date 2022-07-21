const app = Vue.createApp({
    data() {
        return {
            eventNum: 0,
            experimentData: [],
            FREQ: 20,
            PERCISION: 10,
            accels: [0, 0, 0],
            gyros: [0, 0, 0],
        }
    },
    methods: {
        addInitialForm(initialForm) {
            this.experimentData.push(initialForm)
            this.eventNum++
        },
        handleOrientation(event) {
            updateFieldIfNotNull('Orientation_a', event.alpha);
            updateFieldIfNotNull('Orientation_b', event.beta);
            updateFieldIfNotNull('Orientation_g', event.gamma);
        }
    }
})
