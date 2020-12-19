<template>
  <div style="height: 100%">
    <common-chart :chartData="chartData" :isAxisChart="true"></common-chart>
    <common-chart
      :chartData="normalChartData"
      :isAxisChart="false"
    ></common-chart>
  </div>
</template>

<script>
import CommonChart from "../components/CommonChart";
export default {
  components: {
    CommonChart,
  },
  data() {
    return {
      chartData: {
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["2012", "2013", "2014", "2015", "2016"],
          },
        ],
        series: [
          {
            name: "Forest",
            type: "bar",
            barGap: 0,
            data: [320, 332, 301, 334, 390],
          },
          {
            name: "Steppe",
            type: "bar",
            data: [220, 182, 191, 234, 290],
          },
          {
            name: "Desert",
            type: "bar",
            data: [150, 232, 201, 154, 190],
          },
          {
            name: "Wetland",
            type: "bar",
            data: [98, 77, 101, 99, 40],
          },
        ],
        legendData: ["Forest", "Steppe", "Desert", "Wetland"],
      },
      normalChartData: {
        legendData: [
          "直接访问",
          "邮件营销",
          "联盟广告",
          "视频广告",
          "搜索引擎",
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>