app.component('end-screen', {
    template:
    /*html*/
    `<div>
        <h1>The End of Data Collection</h1>
        <br>
        <div v-if="internalStateNum == 0">
            <p>収集した実験データ（この画面の一番下に表示されます）と本研究の目的を確認した上で、送信してください。</p><br>
            <p>本研究の目的は、端末のモーションセンサー情報と総入力/総消去数のみから、スマートフォンユーザーのストレスをニューラルネットワークで検出できるかどうかを確認することです。モバイル端末のストレスを手軽に検出する手法を開発することで、ユーザー体験の向上や日常生活におけるストレスの軽減など、様々な研究への応用が期待されます。</p><br>
            <p>ご同意いただけない場合は、本アプリを終了することで、データの送信を中止することができます。</p><br>
            <p><u style="color: pink;">プライバシーポリシー、収集データ、そして本調査の目的にご賛同いただける場合は、以下のボタンを押してデータを送信してください。</u></p><br>
        </div>
        <br><p v-if="internalStateNum == 1">ご参加ありがとうございました。<br>キーボードの設定を元に戻して、このアプリを終了してください。</p>

        <button class="button" v-if="internalStateNum == 0" :disabled="!tried" @click="sendMessage()">データを送信する</button>
        <button class="button" v-if="isError" @click="created()">サーバーに接続する</button>
        <br><br><br><br><br><br><br><br><br><br><br><br>
        <div v-if="internalStateNum == 0">
            <p>Collected Data:</p>
            <p>{{ runData }}</p>
        </div>
    </div>`,
    props: {
        runData: {
            type: Object,
            required: true
        }
    },
    data() {
      return {
        webSocket: null,
        internalStateNum: 0,
        isError: false,
        tried: false
      }
    },
    methods: {
        created() {
            this.tried = true
            console.log("Starting webSocket to WebSocket Server")
            this.webSocket = new WebSocket("wss://gmc.cps.akita-pu.ac.jp:8080")
            //this.webSocket = new WebSocket("ws://172.24.55.112:8080")
        
            this.webSocket.onmessage = function(event) {
                console.log(event)
            }
        
            this.webSocket.onopen = function(event) {
                console.log(event)
                console.log("Successfully connected to the gmc websocket server...")
            }

            this.webSocket.onclose = function(event){
                console.log(event)
                console.log("Server Disconnected...")
            }
        },
        sendMessage() {
            console.log(this.webSocket)
            if (this.webSocket.readyState == 1) {
                let message = JSON.stringify(this.runData)
                console.log(this.webSocket)
                this.webSocket.send(message)
                this.internalStateNum++
                this.isError = false
            } else {
                alert("エラー: サーバーに接続できませんでした。\n「サーバーに接続する」のボタンを押して再度、送信してください。\n\nもし数回やっても失敗する場合、大変お手数ですが「jo.shimazaki@cps.akita-pu.ac.jp」にメールにてお知らせください。")
                this.isError = true
                this.tried = false
            }
        }
    },
    beforeMount(){
        this.created()
    }
})