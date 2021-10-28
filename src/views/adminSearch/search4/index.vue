<template>
  <div class="admin-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" type="clearfix">
            <div class="title-text">添加设备</div>
          </div>
          <div class="form-area">
            <el-form
              ref="checkForm"
              :inline="true"
              :model="checkForm"
              class="search-form-box"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="设备名" prop="itemId" size="small">
                    <div class="input-area">
                      <el-input
                        placeholder="请输入设备名"
                        v-model="checkForm.itemId"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="辅警姓名" prop="policeId" size="small">
                    <div class="input-area">
                      <el-input
                        placeholder="请输入辅警姓名"
                        v-model="checkForm.policeId"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门名" prop="departmentId" size="small">
                    <div class="input-area">
                      <el-input
                        placeholder="请输入部门名"
                        v-model="checkForm.departmentId"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" size="small" @click="addItem"
                    >添加</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br /><br />
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" type="clearfix">
            <div class="title-text">已添加设备</div>
          </div>
          <div class="form-area">
            <table-page
              :data-source="tableData"
              :columns="tableColumns"
              :page-size="10"
              @onPageChange="handlePageChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TablePage from "@/components/TablePage";
import request from "@/apis/request";

export default {
  name: "",
  components: { TablePage },
  data() {
    return {
      tableData: [{}],
      infodata: {
        idNumber: "",
        name: "",
        brand: "",
        modelNumber: "haha",
        specialProperties: {},
      },
      tableColumns: [
        {
          prop: "departmentId",
          label: "部门",
        },
        {
          prop: "policeId",
          label: "辅警姓名",
        },
        {
          prop: "ItemId",
          label: "设备名",
        },
      ],
      currentPage: 1,
      limit: 5,
      total: 10,
      checkForm: {
        departmentId: "",
        policeId: "",
        itemId: "",
      },
    };
  },
  methods: {
    addItem() {
      console.log(this.checkForm);
      this.infodata.idNumber = this.checkForm.itemId;
      this.infodata.name = this.checkForm.policeId;
      this.infodata.brand = this.checkForm.departmentId;
      const info = JSON.stringify(this.infodata);
      request
        .post("/equipment/add/form", info, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
        });
      console.log(this.infodata);
    },
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
      this.addItem();
    },
  },
};
</script>

<style scoped>
.title-text {
  color: rgb(59, 98, 134);
  font-size: 20px;
  padding: 10px;
  background-color: rgb(255, 255, 255);
}
.admin-container {
  padding: 32px;
  background-color: rgba(131, 168, 238, 0.103);
}
.input-area >>> .el-input__inner {
  border: none;
}
</style>