const socket = io();

// emito mensaje al servidor
socket.emit("Mensaje", "Hola soy el cliente")
// escucho mensaje del server
socket.on('msg_02', data => {
    console.log("Data: ", data)
})