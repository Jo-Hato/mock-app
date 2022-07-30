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
          <p>更に、<u style="color: pink;">携帯電話の英語キーボードを用意し、タイピング修正機能（自動修正、自動Caps、スペルチェックなど）を全てオフにしてください。<br>実験終了後、キーボード設定をオンに戻す際、参考の為、現在のキーボード設定のスクリーンショットを撮っておく事をお勧めします。</p>
          <ul>
            <li>iOSの場合: 設定 > 一般 > キーボード > すべての補正機能をオフにする</li>
            <li>Androidの場合: 設定 > 追加設定 > キーボードと入力方法 > 現在のキーボードを選択 > テキスト補正 > すべての補正機能をオフにする</li>
            <li>キーボードの設定が見つからない場合は、設定画面の上部にある検索バーで「キーボード」と検索してみてください。</li>
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