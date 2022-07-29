app.component('end-screen', {
    template:
    /*html*/
    `<div>
        <h1>The End of Data Collection</h1>
        <br>
        <div v-if="internalStateNum == 0">
            <p>You may review the data collected (displayed at the very bottom of this screen), and the purpose of this research, before sending it over a SSL-secured connection.</p><br>
            <p>The purpose of this research is to see if a neural network can detect smartphone user's stress, only from device's motion sensor info, and total input/deletion number. Developing a method to detect stress on mobile device, in a non-invasive manner, may lead to further research such as improving user experience, reducing stress in daily life, and have many other useful applications.</p><br>
            <p>If you disagree, you may cancel sending data by closing this app.</p><br>
            <p><u style="color: pink;">If you are satisfied with the privacy policy, collected data, and the purpose of this study, please press the button below to send the data.</u></p><br>
        </div>
        <br><p v-if="internalStateNum == 1">Thank you for your participation! :D<br>You may revert the keyboard settings, and close this app.</p>

        <button class="button" v-if="internalStateNum == 0" :disabled="!tried" @click="sendMessage()">Send Data</button>
        <button class="button" v-if="isError" @click="created()">Connect Server</button>
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
                alert("ERROR: Could not connect to the server.\nPlease press 'Connect Server' button.\n\nIf the issue consists, please notify me via jo.shimazaki@cps.akita-pu.ac.jp")
                this.isError = true
                this.tried = false
            }
        }
    },
    beforeMount(){
        this.created()
    }
})