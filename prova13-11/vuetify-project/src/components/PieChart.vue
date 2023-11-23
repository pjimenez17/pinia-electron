<template>
  <pie-chart :data="chartData" :options="options" />
</template>

<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["data", "options"],
  watch: {
    data: function () {
      this.$data._chart.update();
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>
