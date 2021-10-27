<template>
  <div class="check-container">
    <el-table
      :data="userList"
      style="width: 80%; margin-left: 100px; margin-top: 40px"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
      />
      <el-table-column
        label="姓名"
        prop="name"
      />
      <el-table-column
        label="用户名"
        prop="username"
      />
      <el-table-column
        label="id"
        prop="id"
      />
      <el-table-column
        label="证件号码"
        prop="idNumber"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="getUserInfo(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteUser(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; flex-direction: row">
      <el-upload
        ref="upload"
        style="margin-left: 35%; width: 200px"
        class="upload"
        action="string"
        :http-request="submitUserExcel"
        accept=".xlsx"
      >
        <el-button size="small" type="primary" style="margin-left: 100px;margin-top: 40px">用户导入</el-button>
      </el-upload>
      <el-button size="small" type="primary" style="margin-left: 100px;margin-top: 40px" @click="deleteUsers">批量删除</el-button>
    </div>
  </div>
</template>

<script>
import { getUserList,getUserInfo, deleteUser, deleteUsers } from "../../apis/user";
import {uploadFile} from "../../apis/user";

export default {
  inject: ["reload"],
  data() {
    return {
      userList: [],
      fileList: [],
      formData: "",
      userIdList: []
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const result = await getUserList();
      this.userList = result.data;
    },
    async getUserInfo(index, row) {
      await getUserInfo((index, row).id);
    },
    async deleteUser(index, row) {
      await deleteUser((index, row).id);
      this.getUserList();
    },
    handleSelectionChange(val) {
      for (let i = 0; i < val.length; i++) {
        this.userIdList[i] = val[i].id
      }
    },
    async deleteUsers() {
      await deleteUsers(this.userIdList)
      this.getUserList();
    },
    async submitUserExcel(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      const url = "/user/add/batch";
      const result = await uploadFile(url,formData)
      if (result.code === 1) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
      } else if (result.code === 105) {
        this.$message({
          message: "excel文件错误",
          type: "error",
        });
      } else if (result.code === 106) {
        this.$message({
          message: "部门不存在",
          type: "error",
        });
      } else if (result.code === 108) {
        this.$message({
          message: "文件为空",
          type: "error",
        });
      } else if (result.code === 109) {
        this.$message({
          message: "文件格式错误",
          type: "error",
        });
      } else if (result.code === 107) {
        this.$message({
          message: "用户已存在",
          type: "error",
        });
      } else if (result.code === 2403) {
        this.$message({
          message: "权限不足",
          type: "error",
        });
      } else if (result.code === 118) {
        this.$message({
          message: "身份证验证错误",
          type: "error",
        });
      } else {
        this.$message({
          message: "未知错误",
          type: "error",
        });
      }
      this.getUserList();
    },

  }
}
</script>

<style scoped>

</style>
