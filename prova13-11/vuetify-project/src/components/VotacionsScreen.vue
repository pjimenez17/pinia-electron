<template>
    
  </template>
  
  <script>
  import { useAppStore } from '@/store/app';
  
  export default {
  mounted() {
    const store = useAppStore();

    if (!store.isLoggedIn()) {
      const userConfirmed = window.confirm('No estás logueado. ¿Quieres redirigir a la página principal?');

      if (userConfirmed) {
        this.$router.push('/');
      }
    }
  },
};
  </script>