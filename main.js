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
                "record1": null, //{"started": null, "accels": [], "gyros": [], "touches": [], "dels": []}
                "record2": null  //{"started": null, "accels": [], "gyros": [], "touches": [], "dels": []}
            },
            accels: {x: 0, y: 0, z: 0},
            gyros: {x: 0, y: 0, z: 0},
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
                this.gyros.x = event.rotationRate.alpha
            if (event.rotationRate.beta != null)
                this.gyros.y = event.rotationRate.beta
            if (event.rotationRate.gamma != null)
                this.gyros.z = event.rotationRate.gamma
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
        addSensorsData(sensorsData){
            if (this.runData["record1"] == null){
                this.runData["record1"] = sensorsData
            } else {
                this.runData["record2"] = sensorsData
            }
            this.eventNum++
        }
    }
})
