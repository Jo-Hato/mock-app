app.component('end-screen', {
    template:
    /*html*/
    `<div>
        <h1>The End of Data Collection</h1>
        <p>Thank you for your participation! :D</p><br>

        
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
        webSocket: null
      }
    },
    methods: {
        created: function() {
            console.log("Starting webSocket to WebSocket Server")
            this.webSocket = new WebSocket("ws://172.24.55.112:8080")
        
            this.webSocket.onmessage = function(event) {
                console.log(event);
            }
        
            this.webSocket.onopen = function(event) {
                console.log(event);
                console.log("Successfully connected to the gmc websocket server...");
            }

            this.webSocket.onclose = function(event){
                console.log(event);
                console.log("Server Disconnected...");
            };
        },
        sendMessage: function(message) {
            console.log(this.webSocket);
            this.webSocket.send(message);
          }
    },
    beforeMount(){
        this.created()
    }
})