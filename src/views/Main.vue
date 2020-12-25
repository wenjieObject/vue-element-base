<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <common-tab></common-tab>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import CommonAside from "../components/CommonAside";
import CommonTab from "../components/CommonTab";

export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTab,
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: rgb(84, 92, 90);
  padding: 0 5px;
}
</style>