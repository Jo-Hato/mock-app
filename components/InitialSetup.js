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
    `<div>
      <h1>Initial Setup</h1>
      <div style="margin: 2rem;">
      <ul>Accelerometers:
        <li>X: {{ accels.x }}</li>
        <li>Y: {{ accels.y }}</li>
        <li>Z: {{ accels.z }}</li>
      </ul>
          
      <ul>Gyrometers:
        <li>X: {{ gyros.x }}</li>
        <li>Y: {{ gyros.y }}</li>
        <li>Z: {{ gyros.z }}</li>
      </ul>
      </div>
    </div>`,
})