// socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3189'); // Asegúrate de utilizar la URL correcta del servidor

export function emitVotacio(opcion) {
  socket.emit('votacio', opcion);
}

