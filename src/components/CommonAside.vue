<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <el-menu-item
      :index="item.path"
      v-for="item in noChildMenus"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      :index="index + ''"
      v-for="(item, index) in hasChildMenus"
      :key="index"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item
        :index="subItem.path"
        v-for="subItem in item.children"
        :key="subItem.path"
        @click="clickMenu(subItem)"
      >
        <i :class="subItem.icon"></i>
        {{ subItem.label }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState({
      currentMenu: (state) => state.tab.currentMenu,
      isCollapse: (state) => state.tab.isCollapse,
      menu:(state) => state.tab.menu,
    }),
    hasChildMenus() {
      return this.menu.filter((item) => item.children);
    },
    noChildMenus() {
      return this.menu.filter((item) => !item.children);
    },
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>