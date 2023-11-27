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

          <v-card-text>
            <p>Resultados:</p>
            <v-list>
              <v-list-item v-for="(voto, index) in votos" :key="index">
                Opción {{ index + 1 }}: {{ voto }}
              </v-list-item>
            </v-list>
          </v-card-text>
          <div style="height: 400px;"> <!-- Ajusta la altura según sea necesario -->
            <Pie :data="data" :options="chartOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import { useAppStore } from "@/store/app";
import { socket } from "@/services/socket";
import { Pie } from "vue-chartjs";
import { generateChartData, chartOptions } from "@/components/chartConfig";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  components: {
    Pie
  },
  mounted() {
    const store = useAppStore();

    if (!store.isLoggedIn()) {
      window.alert("No has iniciado sesión");
      this.$router.push("/");
    } else {
      socket.on("actualizacionVotos", (newVotos) => {
        store.setVotos(newVotos);
      });
    }
  },
  methods: {
    votar(opcion) {
      const store = useAppStore();

      const votos = store.getVotos();
      votos[opcion]++;
      store.setVotos(votos);
      socket.emit("votacio", opcion);
    },
  },
  
    computed: {
      votos() {
      return useAppStore().getVotos();
    },
    data() {
      return generateChartData();
    },
    chartOptions() {
      return chartOptions;
    }
  },
};
</script>
