app.component('initial-setup', {
    props: {
        accels: {
          type: Object,
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
    <div style="margin: 2rem;">
    <ul>Accelerometers:
      <li>X: {{ accels.x }}</li>
      <li>Y: {{ accels["y"] }}</li>
      <li>Z: {{ accels.z }}</li>
    </ul>
        
    <ul>Gyrometers:
      <li>X: {{ gyros[0] }}</li>
      <li>Y: {{ gyros[1] }}</li>
      <li>Z: {{ gyros[2] }}</li>
    </ul>
    </div>
    `,
    beforeMount(){
    }
})