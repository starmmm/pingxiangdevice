<!--
 * @author Pengyu
 * @brief 登录页账号密码表单组件
 * @example <login-form @submit="onSubmit" />
-->
<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules"
    class="login-form"
    auto-complete="on"
  >
    <div class="title-container">
      <h3 class="title text1">江西省萍乡市交警支队</h3>
      <h3 class="title text2">
        <img v-if="logo" :src="logo" />
        <span>辅警信息管理系统</span>
      </h3>
    </div>

    <el-form-item prop="username" class="form-item-box">
      <span class="svg-container">
        <i class="el-icon-user-solid"></i>
      </span>
      <el-input
        v-model="loginForm.username"
        name="username"
        class="login-input-box"
      />
    </el-form-item>

    <el-form-item prop="password" class="form-item-box">
      <span class="svg-container">
        <i class="el-icon-lock"></i>
      </span>
      <el-input
        ref="password"
        v-model="loginForm.password"
        name="password"
        :type="passwordType"
        class="login-input-box"
      />
      <span class="show-pwd" @click="showPwd">
        <i v-if="passwordType === 'password'" class="el-icon-view"></i>
        <i v-else class="el-icon-moon"></i>
      </span>
    </el-form-item>

    <div class="buttonBox">
      <el-button type="primary" @click="handleLogin">登录</el-button>
      <el-button
        type="warning"
        plain
        style="margin-left: 25px"
        @click="resetLoginForm"
      >重置</el-button>
    </div>
  </el-form>
</template>

<script>
import badgeUrl from "@/assets/badge.png";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
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
      logo: badgeUrl,
    };
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === "password" ? "" : "password";
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
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
  },
};
</script>

<style lang="scss">
.login-input-box {
  width: 85%;
}
.login-input-box > input {
  background: none !important;
  border: none;
  color: #fff;
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
.form-item-box {
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #454545;
  background: rgba(0, 0, 0, 0.1);
}
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 0;
  margin: 0 auto;
  overflow: hidden;
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.title-container {
  position: relative;

  .title {
    color: $light_gray;
    margin: 0px auto 20px auto;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text1 {
    font-size: 30px;
  }
  .text2 {
    font-size: 26px;
    margin-bottom: 30px;
  }
  img {
    width: 40px;
    height: 40px;
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
.buttonBox {
  display: flex;
  justify-content: center;
}
</style>
