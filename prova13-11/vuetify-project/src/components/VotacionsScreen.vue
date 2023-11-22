<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h5">Votaciones</v-card-title>

                    <v-card-text>
                        <v-btn @click="votar(0)">Votar Opción 1</v-btn>
                        <v-btn @click="votar(1)">Votar Opción 2</v-btn>
                        <v-btn @click="votar(2)">Votar Opción 3</v-btn>
                        <v-btn @click="votar(3)">Votar Opción 4</v-btn>
                    </v-card-text>

                    <!-- Puedes mostrar los resultados aquí -->
                    <v-card-text>
                        <p>Resultados:</p>
                        <v-list>
                            <v-list-item v-for="(voto, index) in votos" :key="index">
                                Opción {{ index + 1 }}: {{ voto }}
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { useAppStore } from '@/store/app';
import { emitVotacio } from '@/services/socket';

export default {
    methods: {
        votar(opcion) {
            // Accede a la tienda
            const store = useAppStore();

            // Obtiene el array de votos actual
            const votos = store.getVotos();

            // Incrementa la opción seleccionada
            votos[opcion]++;

            // Actualiza la tienda con los votos actualizados
            store.setVotos(votos);

            // Envía la votación al servidor utilizando la función de emisión
            emitVotacio(opcion);
        },
    },
    computed: {
        votos() {
            // Obtiene los votos actualizados desde la tienda
            return useAppStore().getVotos();
        },
    },
};
</script>
  
<style>
/* Puedes agregar estilos específicos para este componente aquí */
</style>
  