<template>
  <div class="login">
    <el-row style="margin-top: 260px;z-index: 1;">
      <el-col :offset="9" :span="6">
        <el-card v-loading="$store.state.loading" class="login-box" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <h2 class="title">江西省萍乡市交警支队</h2>
            <h3 class="title"> 辅警信息管理系统</h3>
            <p class="login-box-msg">为人民服务!</p>
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" type="text" autocomplete="off" placeholder="请输入用户名..." suffix-icon="el-icon-bell" style="width: 80%; margin-left: 10%" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码..." suffix-icon="el-icon-edit" style="width: 80%; margin-left: 10%" />
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="login" :loading="$store.state.loading" class="pull-right" style="width:100%">登录</el-button>
            </el-form-item>
             <el-form-item>
              <el-button type="primary" @click="login" :loading="$store.state.loading" >登录</el-button>
            </el-form-item>
             <el-form-item>
              <el-button type="primary" @click="login" :loading="$store.state.loading" >重置</el-button>
            </el-form-item> -->
            <div class="buttonBox">
              <el-button type="primary" style="margin-left: 20%" @click="handleLogin" @keyup.enter="enterLogin">登录</el-button>
              <el-button
                type="warning"
                plain
                style="margin-left: 25%"
                @click="resetLoginForm"
              >重置</el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.login {
  background: url(../../assets/bg1.jpg) no-repeat scroll center center / cover;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
  -webkit-animation: kenburns-bottom-right 1s ease-out both;
  animation: kenburns-bottom-right 1s ease-out both;
}

.login-box {
  background: #4e5370;
  border-radius: 25px;
  border: none;
  min-width: 400px;
  margin-left: 70%;
  opacity: 0.75;
  box-shadow: 10px 10px #000000
}

.login-box-msg {
  color: #f5ecec;
  text-align: center;
}

.login-box .title {
  color: #f8f2f2;
  text-align: center;
}
</style>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },
      passwordType: "password",
    };
  },
  created() {
    this.enterLogin();
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.$emit("submit", this.loginForm);
        } else {
          this.$message.error("请输入完整的账号密码");
          return false;
        }
      });
    },
    resetLoginForm() {
      this.$refs.loginForm.resetFields();
    },
    enterLogin() {
      document.onkeydown = e => {
        const key = window.event.keyCode
        if (key === 13) {
          this.handleLogin();
        }
      }
    }
  },
};
</script>
