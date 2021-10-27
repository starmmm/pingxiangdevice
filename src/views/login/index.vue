<template>
  <div class="login-container">
    <sign-in @submit="onSubmit" />
  </div>
</template>

<script>
// import LoginForm from "./LoginForm";
import SignIn from "./SignIn";
import { setToken } from "@/utils/storage";
import {login, queryCurrentUser} from "../../apis/user";

export default {
  name: "Login",
  components: {
    SignIn
  },
  methods: {

    /**
     * @param {object} value
     * @property {string} value.username
     * @property {string} value.password
     */
    async onSubmit(value) {
      const gotoMainPage = () => {
        const redirect =
          (this.$route.query && this.$route.query.redirect) || "/";
        this.$router.push({ path: redirect });
      };

      try {
        const result = await login(value);
        console.log(result);
        if (result.code === -1) {
          return this.$message.error("登录失败");
        }
        setToken(result.data.token);
        this.$message.success("登录成功");
        const { data } = await queryCurrentUser();
        this.$store.commit("user/setState", data);
        console.log("store 数据", this.$store.state);
        gotoMainPage();
      } catch (err) {
        this.$message.error("登录失败");
        console.log("error", err);
      }
    },
  },
};
</script>

<style scoped>
/* .login-container {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  background-image: linear-gradient(rgb(9, 129, 209), rgb(113, 172, 218));
  overflow: hidden;
} */
</style>
