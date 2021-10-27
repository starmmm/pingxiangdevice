<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { queryCurrentUser } from "@/apis/user";
export default {
  name: "App",
  // async mounted() {
  //   const gotoLoginPage = () => {
  //     this.$router.push(`/login?redirect=${this.$route.fullPath}`);
  //   };

  //   // 请求用户信息，若失败则跳转至登录页面
  //   if (this.$router && this.$router.history.current.path !== "login") {
  //     try {
  //       const { data } = await queryCurrentUser();
  //       if (!data || !data.username) {
  //         gotoLoginPage();
  //       } else {
  //         this.$store.commit("user/setState", data);
  //       }
  //     } catch (err) {
  //       gotoLoginPage();
  //     }
  //   }
  // }
}
</script>
