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
        updateIfNotNull(targetVal, value, precision=10) {
            if (value != null)
                targetVal = value.toFixed(precision);
        },
        handleOrientation(event) {
            updateFieldIfNotNull('Orientation_a', event.alpha);
            updateFieldIfNotNull('Orientation_b', event.beta);
            updateFieldIfNotNull('Orientation_g', event.gamma);
        },
        handleMotion(event) {
            //updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
            //updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
            //updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);
            this.updateIfNotNull(this.accels[0], event.acceleration.x)
            updateIfNotNull(this.accels[1], event.acceleration.y)
            updateIfNotNull(this.accels[2], event.acceleration.z)
    
            updateFieldIfNotNull('Accelerometer_i', event.interval, 2);
    
            updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
            updateFieldIfNotNull('Gyroscope_x', event.rotationRate.beta);
            updateFieldIfNotNull('Gyroscope_y', event.rotationRate.gamma);
          }
    }
})
