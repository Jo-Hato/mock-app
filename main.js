const app = Vue.createApp({
    data() {
        return {
            eventNum: 0,
            FREQ: 20,

            runData: {
                "SubjectInfo": null,
                "GroundTruth1": null,
                "GroundTruth2": null,
                "record1": null,
                "record2": null
            },
            accels: [0, 0, 0],
            gyros: [0, 0, 0],
        }
    },
    methods: {
        addInitialForm(initialForm) {
            this.runData["SubjectInfo"] = initialForm
            this.eventNum++
        },
        handleMotion(event) {
            if (event.acceleration.x != null)
                this.accels[0] = event.acceleration.x
            if (event.acceleration.y != null)
                this.accels[1] = event.acceleration.y
            if (event.acceleration.z != null)
                this.accels[2] = event.acceleration.z

            if (event.rotationRate.alpha != null)
                this.gyros[0] = event.rotationRate.alpha
            if (event.rotationRate.beta != null)
                this.gyros[1] = event.rotationRate.beta
            if (event.rotationRate.gamma != null)
                this.gyros[2] = event.rotationRate.gamma
        },


    }
})
