<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            class="user-avatar"
          /> -->
          <img
            src="../../../public/head.jpg"
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="userControl">
            <span>用户管理</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="myInfo">
            <span>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { removeToken } from "@/utils/storage";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.commit("app/toggleSideBar");
    },
    myInfo() {
      this.$router.push({path: "/myinfo"})
    },
    async logout() {
      // 处理退出登录逻辑
      removeToken();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate",function(e) {
        history.pushState(null, null, document.URL);
      }, false);
    },
    userControl() {
      this.$router.push({path: "/userControl"})
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.el-dropdown-menu {
  top: 40px !important;
}
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  padding:8px 5px;
  background-image: white;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
