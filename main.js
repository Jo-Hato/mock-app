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
        }
    },
    beforeMount(){

        /*
        navigator.permissions.query({ name: 'accelerometer' })
        .then(result => {
            if (result.state === 'denied') {
                console.log('Permission to use accelerometer sensor is denied.');
                return;
            }
            navigator.permissions.query({ name: 'accelerometer' })
            .then(result => {
            if (result.state === 'denied') {
                console.log('Permission to use accelerometer sensor is denied.');
                return;
            }
                let acl = new Accelerometer({frequency: this.SENSORFREQ});
                acl.addEventListener('reading', () => {
                this.accels[0] = acl.x
                this.accels[1] = acl.y
                this.accels[2] = acl.z
                //console.log("Acceleration along the X-axis " + acl.x);
                //console.log("Acceleration along the Y-axis " + acl.y);
                //console.log("Acceleration along the Z-axis " + acl.z);
                });
                acl.start();
            });
            
            navigator.permissions.query({ name: 'gyroscope' })
            .then(result => {
              if (result.state === 'denied') {
                console.log('Permission to use gyroscope sensor is denied.');
                return;
              }
              let gyroscope = new Gyroscope({frequency: this.SENSORFREQ});
              gyroscope.addEventListener('reading', e => {
              this.gyros[0] = gyroscope.x
              this.gyros[1] = gyroscope.y
              this.gyros[2] = gyroscope.z
              //console.log("Angular velocity along the X-axis " + gyroscope.x);
              //console.log("Angular velocity along the Y-axis " + gyroscope.y);
              //console.log("Angular velocity along the Z-axis " + gyroscope.z);
              });
              gyroscope.start();
            });
        });
        */

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function(event) {
                // alpha: rotation around z-axis
                const rotateDegrees = event.alpha;
                // gamma: left to right
                const leftToRight = event.gamma;
                // beta: front back motion
                const frontToBack = event.beta;
                this.gyros[0] = frontToBack
                this.gyros[1] = leftToRight
                this.gyros[2] = rotateDegrees
                handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
            }, true);
        }
        
        var handleOrientationEvent = function(frontToBack, leftToRight, rotateDegrees) {

        };
        
    }
})
