import { io } from 'socket.io-client';
import { useAppStore } from '@/store/app';

const URL = process.env.NODE_ENV === "production" ? "http://localhost:3198" : "http://localhost:3198"

export const socket = io('http://localhost:3189');

socket.on("actualizacioVotacions", (newVotos) =>{
  const store = useAppStore();
  store.setVotos(newVotos)
})

