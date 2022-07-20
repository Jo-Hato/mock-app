const app = Vue.createApp({
    data() {
        return {
            eventNum: 0,
            experimentData: [],
            FREQ: 20,
            PERCISION: 10,
            accels: {"x": 0, "y": 0, "z": 0},
            gyros: {"x": 0, "y": 0, "z": 0},
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
        },
        handleMotion(event) {
            updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
            updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
            updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);
            updateFieldIfNotNull('Accelerometer_x', event.acceleration.x);
            updateFieldIfNotNull('Accelerometer_y', event.acceleration.y);
            updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);

            updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
            updateFieldIfNotNull('Gyroscope_x', event.rotationRate.beta);
            updateFieldIfNotNull('Gyroscope_y', event.rotationRate.gamma);
            
            updateFieldIfNotNull('Accelerometer_i', event.interval, 2);
            
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
          }
    }
})
