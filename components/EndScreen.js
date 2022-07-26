app.component('end-screen', {
    template:
    /*html*/
    `<div>
        <h1>The End of Data Collection</h1>
        <p>Thank you for your participation! :D</p><br>

        <p>{{ message }}</p>
        <button class="button" @click="sendMessage(runData)">Send Data</button>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <p>{{ runData }}</p>
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
        message: ""
      }
    },
    methods: {
        created() {
            console.log("Starting webSocket to WebSocket Server")
            this.webSocket = new WebSocket("ws://172.24.55.112:8080")
        
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
            console.log(this.webSocket);
            this.webSocket.send(message);
        }
    },
    beforeMount(){
        //this.created()
    }
})