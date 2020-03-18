<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8"><h1>伪装我是给logo</h1></el-col>
        <el-col :span="8" class="col-center"><h1>电商管理系统</h1></el-col>
        <el-col :span="8" class="col-r"
          ><a href="#" @click.prevent="outLogin">退出</a></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
          :router="true"
          default-active="2"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">角色列表</el-menu-item>
            <el-menu-item index="rights">权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {};
  },
  methods: {
    outLogin() {
      this.$confirm("退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "成功!"
          });
          localStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
<style scoped>
.el-container {
  height: 100%;
  min-width: 900px;
}
.el-header {
  background: #b3c1cd;
  line-height: 60px;
}
.col-center {
  text-align: center;
  color: #fff;
}

.col-r {
  text-align: right;
}
.el-aside {
  background: #545c64;
}
.el-main {
  background: #eaeef1;
}
</style>
