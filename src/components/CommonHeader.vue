<template>
  <header>
    <div class="l-content">
      <el-button type="plain" @click="collapseMenu" icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="currentMenu">{{currentMenu.label}}</el-breadcrumb-item>
      </el-breadcrumb>
       
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="src" class="userImg" />
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
 
export default {
 
  computed: {
    ...mapState({
      currentMenu: (state) => state.tab.currentMenu,
    }),
  },
  data() {
    return {
      src: require("@/assets/images/boy.png"),
    };
  },
  methods: {
    collapseMenu() {
        this.$store.commit("collapseMenu");
    }
  },
 
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 18px;
    }
  }
}

.userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: cornsilk;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: cornsilk;
}
</style>