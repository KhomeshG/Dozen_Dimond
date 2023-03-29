const WebSocket = require("ws")

const server = new WebSocket.Server({port:8080})

server.on("connection", (ws)=>{

    console.log("New Client Connected")
    ws.send("Connected")
}
)