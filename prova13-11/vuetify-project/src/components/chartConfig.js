import { useAppStore } from "@/store/app";

export function generateChartData() {
  const store = useAppStore();

  return {
    labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: store.getVotos()
      }
    ]
  };
}

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: true, // Mantén el aspecto, pero ajusta las dimensiones
  aspectRatio: 2, // Ajusta según tus necesidades (ancho:alto)
};


