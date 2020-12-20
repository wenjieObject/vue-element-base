<template>
  <common-form :formModel="formModel" :formProp="formProp" :inline="false">
    <el-button slot="confirm" type="primary" @click="onSubmit">登录</el-button>
  </common-form>
</template>

<script>
import CommonForm from "@/components/CommonForm";

export default {
  components: {
    CommonForm,
  },
  data() {
    return {
      formModel: {
        userName: "user",
        password: "123",
      },
      formProp: [
        {
          model: "userName",
          label: "用户名",
          type: "input",
        },
        {
          model: "password",
          label: "密码",
          type: "password",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      //登录必须删除之前的菜单
      this.$store.commit("clearMenu");
      this.$store.commit("setToken", "虚拟的token");
      //模拟从后台返回数据
      if (this.formModel.userName === "admin") {
        let adminMenus = [
          {
            path: "/home",
            url:"Home",
            label: "首页",
            name: "home",
            icon: "el-icon-s-home",
          },
          {
            path: "/video",
            url: "video/Video",
            label: "视频管理",
            name: "video",
            icon: "el-icon-video-play",
          },
          {
            path: "/user",
            url: "user/User",
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
                url: "other/Page1",
                label: "页面1",
                name: "page1",
                icon: "el-icon-delete",
              },
              {
                path: "/page2",
                url: "other/Page2",
                label: "页面2",
                name: "page2",
                icon: "el-icon-delete-solid",
              },
            ],
          },
        ];

        this.$store.commit("setMenu", adminMenus);
        this.$store.commit("addRouter", this.$router);
        this.$router.push({ name: "page2" });

      } else if (this.formModel.userName === "user") {
        let userMenus = [
          {
            url: "Home",
            path: "/home",
            label: "首页",
            name: "home",
            icon: "el-icon-s-home",
          },
          {
            path: "/user",
            url: "user/User",
            label: "人员管理",
            name: "user",
            icon: "el-icon-user",
          },
          {
            label: "其他页面",
            icon: "el-icon-user",
            children: [
              {
                path: "/page2",
                url: "other/Page2",
                label: "页面2",
                name: "page2",
                icon: "el-icon-delete-solid",
              },
            ],
          },
        ];

        this.$store.commit("setMenu", userMenus);
        this.$store.commit("addRouter", this.$router);
        this.$router.push({ name: 'home'});

      } else {
        this.$message.error("用户名或密码错了哦");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  margin: 0 auto;
  width: 18rem;
  padding: 1rem;
  background-color: white;
}
</style>