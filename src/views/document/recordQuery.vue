<template>
  <div class="admin-container">
    <el-page-header class="goback" @back="goBack" />

    <router-view />

    <el-row :gutter="40" class="card-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <el-row type="flex">
              <el-col span="24">
                <span>条件筛选</span>
              </el-col>
              <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
              <el-button
                size="small"
                @click="resetForm('queryForm')"
              >重置</el-button>
            </el-row>
          </div>

          <div class="form-area">
            <el-form
              ref="queryForm"
              :inline="true"
              :model="queryForm"
            >
              <el-row>
                <el-col :span="7">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="queryForm.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="证件状态" prop="certificateStatus">
                    <el-select
                      v-model="queryForm.certificateStatus"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="s in statusOptions"
                        :key="s.value"
                        :value="s.value"
                        :label="s.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="申请时间" prop="submitTime">
                    <el-date-picker
                      v-model="queryForm.submitTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="timestamp"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="40" class="card-group">
      <el-col :xs="96" :sm="96" :lg="48">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <span>办理记录</span>
          </div>
          <div class="form-area">
            <el-table :data="dataList.certificateRecordVoList">
              <el-table-column prop="operatedPeople" align="center" label="姓名" />
              <el-table-column prop="certificateStatus" align="center" label="办理类型" />
              <el-table-column prop="applyReason" align="center" label="办理原因" />
              <el-table-column prop="submitTime" align="center" label="提交时间" />
              <el-table-column prop="submitterName" align="center" label="办理人" />
            </el-table>
            <el-pagination
              :current-page="queryForm.page"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="queryForm.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dataList.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { queryApplyRecord } from "../../apis/document"
import decode from "../../enums/decode"

export default {
  data() {
    return {
      queryForm: {
        name: "",
        submitTime: "",
        submitterName: "",
        certificateStatus: "",
        submitStartTime: 0,
        submitEndTime: 0,
        page: 1,
        limit: 5
      },
      dataList: {},
      statusOptions: [
        {
          label: "首办",
          value: 1,
        },
        {
          label: "更换",
          value: 2
        },
        {
          label: "补办",
          value: 3
        }
      ],

    }
  },
  mounted() {
    this.handleQuery();
  },
  methods: {
    goBack() {
      this.$router.push("./document");
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    async handleQuery() {
      this.queryForm.submitterName = this.$store.state.user.username
      this.queryForm.submitStartTime = this.queryForm.submitTime[0]
      this.queryForm.submitEndTime = this.queryForm.submitTime[1] + 86400000
      const result = await queryApplyRecord(this.queryForm)
      if (result.code === 1) {
        console.log(result.data)
        this.dataList = result.data
        for (const d of this.dataList.certificateRecordVoList) {
          d.submitTime = this.formatDate(d.submitTime)
          d.certificateStatus = decode.certificateStatusType[d.certificateStatus]
          d.applyReason = decode.applyReasonType[d.applyReason]
        }
      }
    },
    formatDate(time) {
      const date = new Date(time)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = month < 10 ? "0" + month : month
      day = day < 10 ? "0" + day : day
      return year + "-" + month + "-" + day
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.handleQuery();
    },
    handleCurrentChange(currentPage) {
      this.queryForm.page = currentPage
      this.handleQuery();
    }
  },
}
</script>

<style lscoped>
.title-card {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
.admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

.blank {
  height: 10px;
  background-color: white;
}
.goback{
  padding:10px 0px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
