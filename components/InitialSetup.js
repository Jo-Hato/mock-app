app.component('initial-setup', {
    props: {
        accels: {
          type: Array,
          required: true
        },
        gyros: {
          type: Array,
          required: true
        },
      },
    template:
    /*html*/
    `<h1>Initial Setup</h1>

    <p>Accelerometers:<br>
        X: {{ accels[0] }}<br>
        Y: {{ accels[1] }}<br>
        Z: {{ accels[2] }}<br>
    </p>
    <p>Gyrometers:<br>
        X: {{ gyros[0] }}<br>
        Y: {{ gyros[1] }}<br>
        Z: {{ gyros[2] }}<br>
    </p>
    `,
    beforeMount(){
    }
})