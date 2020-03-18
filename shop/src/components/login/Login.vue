<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="startLogin()">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    startLogin() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return this.$message.error("格式错误");
        }
        axios
          .post("http://localhost:8888/api/private/v1/login", this.ruleForm)
          .then(res => {
            if (res.data.meta.status === 200) {
              localStorage.setItem("token", res.data.data.token);
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });
            } else if (res.data.meta.status === 400) {
              return this.$message.error(res.data.meta.msg);
            }
            this.$router.push("/home");
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.el-row {
  background: #2d434c;
  height: 100%;
}
.el-col {
  background: #fff;
  padding: 30px 30px;
  border-radius: 16px;
}
</style>
