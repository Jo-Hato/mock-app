app.component('end-screen', {
    template:
    /*html*/
    `<div>
        <h1>The End of Data Collection</h1>
        <br>
        <p v-if="internalStateNum == 0">Please press the button below to send the data.
            You may review the data collected, which is displayed at the bottom of this screen, before sending.
        </p>
        <br><p v-if="internalStateNum == 1">Thank you for your participation! :D<br>You may revert the keyboard settings, and close this app.</p>

        <button class="button" v-if="internalStateNum == 0" :disabled="!tried" @click="sendMessage()">Send Data</button>
        <button class="button"v-if="internalStateNum != 1" v-if="isError" @click="created()">Connect Server</button>
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
            } else {
                alert("ERROR: Could not connect to the server.\nPlease press 'Connect Server' button.\n\nIf the issue consists, please notify the instructor.")
                this.isError = true
                this.tried = false
            }
        }
    },
    beforeMount(){
        this.created()
    }
})