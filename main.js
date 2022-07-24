const app = Vue.createApp({
    data() {
        return {
            debugMode: true,
            eventNum: 0,
            FREQ: 20,

            runData: {
                "subjectInfo": null, //{"id": null, "name": "", "age": 0, "gender": ""}
                "groundTruth1": null,
                "groundTruth2": null,
                "record1": null, //{"started": null, "accels": [], "gyros": [], "touches": [], "dels": []}
                "record2": null  //{"started": null, "accels": [], "gyros": [], "touches": [], "dels": []}
            },
            accels: {x: 0.0, y: 0.0, z: 0.0},
            gyros: {x: 0.0, y: 0.0, z: 0.0},
            PRECISION: 1
        }
    },
    methods: {
        addInitialForm(initialForm) {
            this.runData["subjectInfo"] = initialForm
            this.eventNum++
        },
        addGroundTruth(truthForm){
            if (this.runData["groundTruth1"] == null){
                this.runData["groundTruth1"] = truthForm
            } else {
                this.runData["groundTruth2"] = truthForm
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
