const app = Vue.createApp({
    data() {
        return {
            eventNum: 0,
            experimentData: [],
            gyro: 0
        }
    },
    methods: {
        addInitialForm(initialForm) {
            this.experimentData.push(initialForm)
            this.eventNum++
        }
    },
    beforeMount(){
        navigator.permissions.query({ name: 'accelerometer' })
        .then(result => {
            if (result.state === 'denied') {
                console.log('Permission to use accelerometer sensor is denied.');
                return;
            }

            let accelerometer = null;
            try {
                accelerometer = new Accelerometer({ referenceFrame: 'device' });
                accelerometer.addEventListener('error', event => {
                    // Handle runtime errors.
                    if (event.error.name === 'NotAllowedError') {
                        // Branch to code for requesting permission.
                    } else if (event.error.name === 'NotReadableError' ) {
                        console.log('Cannot connect to the sensor.');
                    }
                });
                accelerometer.addEventListener('reading', () => reloadOnShake(accelerometer));
                accelerometer.start();
            } catch (error) {
                // Handle construction errors.
                if (error.name === 'SecurityError') {
                    // See the note above about feature policy.
                    console.log('Sensor construction was blocked by a feature policy.');
                } else if (error.name === 'ReferenceError') {
                    console.log('Sensor is not supported by the User Agent.');
                } else {
                    throw error;
                }
            }

            let gyroscope = new Gyroscope({frequency: 60});
            gyroscope.addEventListener('reading', e => {
            this.gyro = gyroscope.x
            console.log("Angular velocity along the X-axis " + gyroscope.x);
            console.log("Angular velocity along the Y-axis " + gyroscope.y);
            console.log("Angular velocity along the Z-axis " + gyroscope.z);
            });
            gyroscope.start();
        });
    }
})
