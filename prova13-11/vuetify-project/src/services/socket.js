import { io } from 'socket.io-client';
import { useAppStore } from '@/store/app';

const URL = process.env.NODE_ENV === "production" ? "http://pablovotacions.dam.inspedralbes.cat:3189/" : "http://pablovotacions.dam.inspedralbes.cat:3189/"

export const socket = io('http://pablovotacions.dam.inspedralbes.cat:3189/');

socket.on("actualizacioVotacions", (newVotos) =>{
  const store = useAppStore();
  store.setVotos(newVotos)
})

