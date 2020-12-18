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
      asideMenus: [
        {
          path: "/",
          label: "首页",
          name: "home",
          icon: "el-icon-s-home",
        },
        {
          path: "/video",
          label: "视频管理",
          name: "video",
          icon: "el-icon-video-play",
        },
        {
          path: "/user",
          label: "人员管理",
          name: "user",
          icon: "el-icon-user",
        },
        {
          label: "其他页面",
          icon: "el-icon-user",
          children: [
            {
              path: "/page1",
              label: "页面1",
              name: "page1",
              icon: "el-icon-delete",
            },
            {
              path: "/page2",
              label: "页面2",
              name: "page2",
              icon: "el-icon-delete-solid",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState({
      currentMenu: (state) => state.tab.currentMenu,
      isCollapse: (state) => state.tab.isCollapse,
    }),
    hasChildMenus() {
      return this.$data.asideMenus.filter((item) => item.children);
    },
    noChildMenus() {
      return this.$data.asideMenus.filter((item) => !item.children);
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