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
        debugMode: {
          type: Boolean,
          required: true
        },
      },
    template:
    /*html*/
    `<div>
      <h1>Initial Setup</h1>
      <div style="margin: 2rem;">
        <div>
          <p>この実験では、<u style="color: pink;">携帯電話の音量をオンにしてください。</u></p><br>
        </div>

        <div v-if="debugMode" style="color: fuchsia;">
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
      </div>
    </div>`,
})