const app = Vue.createApp({
    data() {
        return {
            debugMode: true,
            eventNum: 0,
            FREQ: 20,

            runData: {
                "SubjectInfo": null, //{"id": null, "name": "", "age": 0, "gender": ""}
                "GroundTruth1": null,
                "GroundTruth2": null,
                "record1": null, //{"started": null, "accels": [], "gyros":[], "touches": 0, "dels": 0}
                "record2": null  //{"started": null, "accels": [], "gyros":[], "touches": 0, "dels": 0}
            },
            //accels: [0, 0, 0],
            accels: {x: 99, y: 0, z: 0},
            gyros: [0, 0, 0],
        }
    },
    methods: {
        handleMotion(event) {
            if (event.acceleration.x != null)
                this.accels.x = event.acceleration.x
            if (event.acceleration.y != null)
                this.accels.y = event.acceleration.y
            if (event.acceleration.z != null)
                this.accels.z = event.acceleration.z

            if (event.rotationRate.alpha != null)
                this.gyros[0] = event.rotationRate.alpha
            if (event.rotationRate.beta != null)
                this.gyros[1] = event.rotationRate.beta
            if (event.rotationRate.gamma != null)
                this.gyros[2] = event.rotationRate.gamma
        },
        addInitialForm(initialForm) {
            this.runData["SubjectInfo"] = initialForm
            this.eventNum++
        },
        addGroundTruth(truthForm){
            if (this.runData["GroundTruth1"] == null){
                this.runData["GroundTruth1"] = truthForm
            } else {
                this.runData["GroundTruth2"] = truthForm
            }
            this.eventNum++
        },
    }
})
