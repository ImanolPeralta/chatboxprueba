const socket = io();

let user;
const input = document.getElementById("chatBox");
const logHbs = document.getElementById("messageLogs");

// Sweet Alert
Swal.fire({
  icon: "info",
  title: "Identificarse con el nikUser",
  input: "text",
  text: "Ingrese el userName para identificarse en el chat",
  inputValidator: (value) => {
    if (!value) {
      return "Necesitas escribir tu userName para continuar!";
    }
  },
  allowOutsideClick: false
}).then((result) => {
  user = result.value;
  document.getElementById("myName").innerHTML = user;
  socket.emit('userConnected', { user });
});

// Guardar mensaje por usuario y mostrarlo en el messageLog
input.addEventListener('keyup', (evt) => {
  if (evt.key === "Enter") {
    let newData = input.value.trim();
    if (newData.length > 0) {
      socket.emit("message", { user: user, message: newData });
      input.value = '';
    } else {
      Swal.fire({
        icon: "warning",
        title: "Alerta",
        text: "Por favor, ingrese un mensaje"
      });
    }
  }
});

// Recibir logs y mostrarlos
socket.on("messageLogs", (data) => {
  let logs = "";
  data.forEach((log) => {
    logs += `<div><span><b>${log.user}</b>: </span>${log.message}</div>`;
  });
  logHbs.innerHTML = logs;
});

// Notificación de nuevo usuario
socket.on('userConnected', userData => {
  let message = `Nuevo usuario conectado: ${userData.user}`;
  Swal.fire({
    icon: 'info',
    text: message,
    toast: true,
    position: 'top-right',
    timer: 3000,
    showConfirmButton: false
  });
});

// Cerrar chat
const closeChat = document.getElementById('closeChatBox');
if (closeChat) {
  closeChat.addEventListener('click', evt => {
    socket.emit('closeChat', { close: true });
    logHbs.innerHTML = '';
  });
}
