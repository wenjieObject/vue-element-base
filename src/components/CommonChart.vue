<template>
  <div style="height: 100%" ref="chartdiv"></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          //横坐标参数
          xAxis: [],
          //表格数据
          series: [],
          legendData: [],
        };
      },
    },
    //是否含有坐标轴
    isAxisChart: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    option() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
    isCollapse(){
        return this.$store.state.tab.isCollapse
    }
  },
  data() {
    return {
      axisOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
        },
        xAxis: [],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [],
      },
      normalOption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          data: [],
        },
        series: [],
      },
    };
  },
  watch: {
    //表格数据发生变化后重新渲染
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
    isCollapse() {
      setTimeout(() => {
          this.resizeChart()
      }, 300);
      
    },
  },
  methods: {
    resizeChart() {
        debugger
      let chart = this.$refs.chartdiv;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        myChart.resize();
      }
    },
    initChart() {
      let chart = this.$refs.chartdiv;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        this.initChartData();
        myChart.setOption(this.option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
        this.$on("hook:destroyed", () => {
          window.removeEventListener("resize", function () {
            myChart.resize();
          });
        });
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis = this.chartData.xAxis;
        this.axisOption.series = this.chartData.series;
        this.axisOption.legend.data = this.chartData.legendData;
      } else {
        this.normalOption.series = this.chartData.series;
        this.normalOption.legend.data = this.chartData.legendData;
      }
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style lang="scss" scoped>
</style>