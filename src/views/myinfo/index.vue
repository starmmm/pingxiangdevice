<template>
  <div class="check-container">
    <el-tabs tab-position="top" style="height: 200px;">
      <el-tab-pane label="用户管理">
        <el-form ref="infoForm" :inline="true" :model="infoForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="infoForm.username" readonly />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="infoForm.name" />
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="infoForm.department" readonly />
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="infoForm.idNumber" readonly />
          </el-form-item>
          <el-button type="primary" @click="resetUserName(infoForm.name)">姓名更改</el-button>
          <el-button @click="goBack()">返回</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="更改密码">
        <el-form :ref="pw" :model="pw" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原始密码" prop="oldPassword">
            <el-input v-model="pw.oldPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="pw.newPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input v-model="pw.rePassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePassword(pw)">修改</el-button>
            <el-button @click="resetPassword(pw)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import {resetPassword, updataUserName, queryCurrentUser} from "@/apis/user";
import { removeToken } from "@/utils/storage";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pw.rePassword !== "") {
          const pw = this.pw;
          this.$refs[pw].validateField("rePassword");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pw.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      readName: true,
      infoForm: this.$store.state.user,
      pw: {
        oldPassword: "",
        newPassword: "",
        rePassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入原始密码", trigger: "blur" }
        ],
        newPassword: [
          { validator: validatePass, trigger: "blur" }
        ],
        rePassword: [
          { validator: validatePassCheck, trigger: "blur" }
        ]
      }
    }
  },
  mounted() {
    this.infoForm.department = this.infoForm.department.split("/")[0];
  },
  methods: {
    async resetUserName(name) {
      try {
        const result = await updataUserName(name);
        this.$message.success("修改成功");
        const { data } = await queryCurrentUser();
        this.$store.commit("user/setState", data);
        this.goBack()
      } catch (err) {
        this.$message.error("修改失败");
        console.log("error", err);
      }
    },
    goBack() {
      const redirect =
                    (this.$route.query && this.$route.query.redirect) || "/";
      this.$router.push({path: redirect})
    },
    updatePassword(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const passwordParams = {
            oldPassword: this.pw.oldPassword,
            newPassword: this.pw.newPassword
          }
          const result = await resetPassword(passwordParams)
          if (result.code === 1) {
            this.$message.success("修改成功");
            removeToken();
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          }
        } else {
          this.$message.error("修改失败")
          return false;
        }
      });
    },
    resetPassword(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style lang="scss" scoped>
    .check {
        &-container {
            margin: 30px;
        }
    }
</style>
