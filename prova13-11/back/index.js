import history from 'connect-history-api-fallback';
import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import fs from 'fs';

const app = express();
//Permetem que el servidor pugui rebre peticions de qualsevol origen
app.use(cors());

//Creem el servidor de Socket.io especificant que pot accedir qualsevol client
const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  }
});

app.use(express.static('./dist'))


app.get('/', (req, res) => {
  res.sendFile(new URL('./dist/index.html').pathname);
});

io.on('connection', (socket) => {
  socket.on('votacio', (msg) => {
    // Llegim l'arxiu de votacions
    console.log("arriba una votacio")
    console.log(msg)
    fs.readFile('votos.json', 'utf8', (err, data) => {
      if (err) throw err;

      // Parsejem el JSON
      const votos = JSON.parse(data);
      console.log(votos)
      // Actualistem el rempte de vots
        votos[msg]++;

      // Guardem el JSON actualitzat
      fs.writeFile('votos.json', JSON.stringify(votos), (err) => {
        if (err) throw err;

        // Emitim el JSON actualitzat
        io.emit('actualizacioVotacions', votos);
        console.log("S'ha emes una actualitzacio")
        console.log(votos)
      });
    });
  });
});

server.listen(3189, () => {
  console.log('Server running at http://localhost:3189');
});


const staticFileMiddleware = express.static("./dist")
app.use(staticFileMiddleware)
app.use(history({
  disableDotRule: true,
  verbose: true
}))

app.use(staticFileMiddleware)