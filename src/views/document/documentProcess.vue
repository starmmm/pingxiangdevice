<template>
  <div class="admin-container">
    <el-page-header class="goback" @back="goBack" />
    <router-view />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <el-row type="flex">
              <el-col span="24">
                <span>警察证办理</span>
              </el-col>
              <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
              <el-button
                size="small"
                @click="resetForm('processForm')"
              >重置</el-button>
            </el-row>
          </div>

          <div class="form-area">
            <el-form
              ref="processForm"
              :inline="true"
              :model="processForm"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="姓名" prop="operatedPeople" label-width="100px">
                    <el-input v-model="operatedPeople" readonly />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="办理类别" prop="certificateStatus" label-width="100px">
                    <el-select
                      v-model="processForm.certificateStatus"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="category in categoryOption"
                        :key="category.value"
                        :value="category.value"
                        :label="category.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="办理原因" prop="applyReason" label-width="100px">
                    <el-select
                      v-model="processForm.applyReason"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="reason in reasonOption"
                        :key="reason.value"
                        :value="reason.value"
                        :label="reason.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { applyDocumentChange } from "../../apis/document"

export default {
  name: "DocumentProcess",
  data() {
    return {
      operatedPeople: this.$route.query.name,
      processForm: {
        operatedPeopleId: parseInt(this.$route.query.id),
        applyReason: "",
        certificateStatus: "",
        submitterId: ""
      },
      categoryOption: [
        {
          label: "首办",
          value: 1,
        },
        {
          label: "更换",
          value: 2,
        },
        {
          label: "补办",
          value: 3,
        }
      ],
      firstOption: [
        {
          label: "首次申领",
          value: 11,
        },
        {
          label: "其他情况",
          value: 10,
        }
      ],
      replaceOption: [
        {
          label: "单位变动",
          value: 1,
        },
        {
          label: "警衔变动",
          value: 2,
        },
        {
          label: "职务变动",
          value: 3,
        },
        {
          label: "警号变动",
          value: 4,
        },
        {
          label: "其他变动",
          value: 5,
        },
      ],
      repairOption: [
        {
          label: "遗失",
          value: 6,
        },
        {
          label: "被盗",
          value: 7,
        },
        {
          label: "被抢",
          value: 8,
        },
        {
          label: "严重损坏",
          value: 9,
        },
        {
          label: "其他情况",
          value: 10,
        }
      ],
    }
  },
  computed: {
    reasonOption: function() {
      if (this.processForm.certificateStatus === 1) {
        return this.firstOption
      } else if (this.processForm.certificateStatus === 2) {
        return this.replaceOption
      } else if (this.processForm.certificateStatus === 3) {
        return this.repairOption
      } else {
        return [];
      }
    }
  },
  watch: {
    "processForm.certificateStatus": function() {
      this.processForm.applyReason = "";
    }
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
    async handleSubmit() {
      this.processForm.submitterId = this.$store.state.user.id
      const result = await applyDocumentChange(this.processForm)
      if (result.code === 1) {
        this.$message({
          message: "提交成功",
          type: "success"
        });
      }
    }
  },
}
</script>

<style scoped>
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
</style>
