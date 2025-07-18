import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.routes.js';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

app.use('/', viewRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
});

httpServer.on('error', (err) => {
    console.error("Error en el servidor:", err);
});

const socketServer = new Server(httpServer);

const messages = [];

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    // Enviar historial al nuevo usuario
    socket.emit('messageLogs', messages);

    // Mensajes normales
    socket.on('message', data => {
        console.log("Data: ", data);
        messages.push(data);
        socketServer.emit('messageLogs', messages);
    });

    // Broadcast a todos menos el nuevo
    socket.on('userConnected', data => {
        console.log('userConnected', data);
        socket.broadcast.emit('userConnected', { user: data.user });
    });

    // Cerrar canal
    socket.on('closeChat', data => {
        console.log('close:', data);
        if (data.close) {
            socket.disconnect();
            console.log('Canal de chat cerrado para un user específico');
        }
    });
});
