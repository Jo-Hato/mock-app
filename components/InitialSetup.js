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
          <p>During this experiment, please <u style="color: pink;">turn on your phone's volume on.</u></p><br>
          <p>Additionally, please <u style="color: pink;">turn off ALL of your phone's typing correction features</u> (e.g. auto corrections, auto Caps, spelling check).<br> After the experiment is finished, you may turn on the auto corrections. It is recommended to take a screenshot of your current settings for a reference, when you turn it back on.</p>
          <ul>
            <li>For iOS: Settings > General > Keyboard > Turn off all corrections features</li>
            <li>For Android: Settings > Additional settings > Keyboard & input method > Choose your current keyboard > Text correction > Turn off all correction features</li>
            <li>If you have trouble finding the keyboad settings, try using the search bar, usually located at the top of your settings screen</li>
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