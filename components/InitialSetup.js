app.component('initial-setup', {
    props: {
        accels: {
          type: Object,
          required: true
        },
        gyros: {
            type: Object,
            required: true
          },
      },
    template:
    /*html*/
    `<h1>Initial Setup</h1>

    <p>Accelerometers:<br>
        X: {{ accels["x"] }}<br>
        Y: {{ accels.y }}<br>
        Z: {{ accels.z }}<br>
    </p>
    <p>Gyrometers:<br>
        X: {{ gyros.x }}<br>
        Y: {{ gyros.y }}<br>
        Z: {{ gyros.z }}<br>
    </p>
    `,
    beforeMount(){
      }
})