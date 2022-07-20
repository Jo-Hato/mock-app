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
    `
    <h4>Orientation</h4>
    <ul>
      <li>X-axis (&beta;): <span id="Orientation_b">0</span><span>&deg;</span></li>
      <li>Y-axis (&gamma;): <span id="Orientation_g">0</span><span>&deg;</span></li>
      <li>Z-axis (&alpha;): <span id="Orientation_a">0</span><span>&deg;</span></li>
    </ul>
    
    <h4>Accelerometer</h4>
    <ul>
      <li>X-axis: <span id="Accelerometer_x">0</span><span> m/s<sup>2</sup></span></li>
      <li>Y-axis: <span id="Accelerometer_y">0</span><span> m/s<sup>2</sup></span></li>
      <li>Z-axis: <span id="Accelerometer_z">0</span><span> m/s<sup>2</sup></span></li>
      <li>Data Interval: <span id="Accelerometer_i">0</span><span> ms</span></li>
    </ul>
    
    <h4>Accelerometer including gravity</h4>
    
    <ul>
      <li>X-axis: <span id="Accelerometer_gx">0</span><span> m/s<sup>2</sup></span></li>
      <li>Y-axis: <span id="Accelerometer_gy">0</span><span> m/s<sup>2</sup></span></li>
      <li>Z-axis: <span id="Accelerometer_gz">0</span><span> m/s<sup>2</sup></span></li>
    </ul>
    
    <h4>Gyroscope</h4>
    <ul>
      <li>X-axis: <span id="Gyroscope_x">0</span><span>&deg;/s</span></li>
      <li>Y-axis: <span id="Gyroscope_y">0</span><span>&deg;/s</span></li>
      <li>Z-axis: <span id="Gyroscope_z">0</span><span>&deg;/s</span></li>
    </ul>
    `,
    beforeMount(){
      }
})