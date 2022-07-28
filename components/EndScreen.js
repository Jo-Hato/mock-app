app.component('end-screen', {
    template:
    /*html*/
    `<div>
        <h1>The End of Data Collection</h1>
        <br>
        <p v-if="internalStateNum == 0">Please press the button below to send the data.
            You may review the data collected, which is displayed at the bottom of this screen, before sending.
        </p>
        <br><p v-if="internalStateNum == 1">Thank you for your participation! :)<br>You may revert the keyboard settings, and close this app.</p>

        <p>{{ message }}</p>
        <button class="button" v-if="internalStateNum == 0" @click="sendMessage(runData)">Send Data</button>
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
        message: "",
        internalStateNum: 0
      }
    },
    methods: {
        created() {
            console.log("Starting webSocket to WebSocket Server")
            this.webSocket = new WebSocket("wss://gmc.cps.akita-pu.ac.jp:8080")
        
            this.webSocket.onmessage = function(event) {
                console.log(event);
                this.message += event
            }
        
            this.webSocket.onopen = function(event) {
                console.log(event);
                this.message += event
                console.log("Successfully connected to the gmc websocket server...")
                this.message += "Successfully connected to the gmc websocket server..."
            }

            this.webSocket.onclose = function(event){
                console.log(event)
                this.message += event
                console.log("Server Disconnected...")
                this.message += "Server Disconnected..."
            };
        },
        sendMessage(message) {
            this.internalStateNum++
            console.log(this.webSocket);
            this.webSocket.send(message);
        }
    },
    beforeMount(){
        this.created()
    }
})