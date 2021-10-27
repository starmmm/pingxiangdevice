<template>
  <div class="admin-container">
    <router-view />

    <!-- <card-panel-of-document /> -->

    <el-row :gutter="40" class="card-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <el-row type="flex">
              <el-col span="24">
                <span>人员查询</span>
              </el-col>
              <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
              <el-button
                size="small"
                @click="resetForm('documentForm')"
              >重置</el-button>
            </el-row>
          </div>

          <div class="form-area">
            <el-form
              ref="documentForm"
              :inline="true"
              :model="documentForm"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="documentForm.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门" prop="departmentId">
                    <el-select
                      v-model="documentForm.departmentId"
                      placeholder="请选择"
                    >
                      <el-option-group
                        v-for="group in departmentoptions"
                        :key="group.label"
                        :label="group.label"
                      >
                        <el-option
                          v-for="d in group.departmentoptions"
                          :key="d.value"
                          :value="d.value"
                          :label="d.label"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="警察证编号" prop="policeNumber">
                    <el-input
                      v-model="documentForm.policeNumber"
                    />
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                  <el-form-item label="证件状态" prop="certificateStatus">
                    <el-select
                      v-model="documentForm.certificateStatus"
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
                </el-col> -->
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
            <span>查询结果</span>
          </div>
          <div class="form-area">
            <el-table :data="dataList.policeBasicInfoVoList">
              <el-table-column type="index" :index="indexMethod" />
              <el-table-column prop="name" align="center" label="姓名" />
              <el-table-column
                prop="department"
                align="center"
                label="部门"
              />
              <el-table-column prop="policeNumber" align="center" label="警号" />
              <el-table-column fixed="right" align="center" label="操作">
                <template slot-scope="scope" align="center">
                  <el-button type="text" @click="documentProcess(scope.row)">办理</el-button>
                </template>
              </el-table-column>
              <el-table-column v-if="false" prop="id" />
              <el-table-column v-if="false" prop="certificateStatus" />
            </el-table>
            <el-pagination
              :current-page="documentForm.page"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="documentForm.limit"
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
// import CardPanelOfDocument from "./CardPanelOfDocument.vue";
import { getListByCertificate } from "../../apis/document"

export default {
  name: "Document",
  components: {
    // CardPanelOfDocument
  },
  data() {
    return {
      documentForm: {
        name: "",
        departmentId: "",
        policeNumber: "",
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
      departmentoptions: [
        {
          label: "交通警察支队",
          departmentoptions: [
            {
              label: "交通警察支队",
              value: 1,
            },
            {
              label: "办公室",
              value: 2,
            },
            {
              label: "政工科",
              value: 3,
            },
            {
              label: "财务科",
              value: 4,
            },
          ],
        },
        {
          label: "交通秩序管理科",
          departmentoptions: [
            {
              label: "交通秩序管理科",
              value: 5,
            },
            {
              label: "特勤中队",
              value: 6,
            },
            {
              label: "交通设施股",
              value: 7,
            },
          ],
        },
        {
          label: "事故处理大队",
          departmentoptions: [
            {
              label: "事故处理大队",
              value: 8,
            },
          ],
        },
        {
          label: "车辆管理所",
          departmentoptions: [
            {
              label: "车辆管理所",
              value: 9,
            },
            {
              label: "政秘股",
              value: 10,
            },
            {
              label: "车辆管理股",
              value: 11,
            },
            {
              label: "驾驶员管理",
              value: 12,
            },
            {
              label: "证照股",
              value: 13,
            },
            {
              label: "档案管理股",
              value: 14,
            },
            {
              label: "考试股",
              value: 15,
            },
          ],
        },
        {
          label: "直属大队",
          departmentoptions: [
            {
              label: "直属大队",
              value: 16,
            },
            {
              label: "政秘股",
              value: 17,
            },
            {
              label: "秩序股",
              value: 18,
            },
            {
              label: "事故处理股",
              value: 19,
            },
            {
              label: "一中队",
              value: 20,
            },
            {
              label: "二中队",
              value: 21,
            },
            {
              label: "三中队",
              value: 22,
            },
            {
              label: "四中队",
              value: 23,
            },
          ],
        },
        {
          label: "安源大队",
          departmentoptions: [
            {
              label: "安源大队",
              value: 24,
            },
            {
              label: "政秘股",
              value: 25,
            },
            {
              label: "秩序股",
              value: 26,
            },
            {
              label: "高坑中队",
              value: 27,
            },
            {
              label: "青山中队",
              value: 28,
            },
            {
              label: "事故处理股",
              value: 29,
            },
            {
              label: "安源中队",
              value: 30,
            },
            {
              label: "五陂中队",
              value: 31,
            },
          ],
        },
        {
          label: "湘东大队",
          departmentoptions: [
            {
              label: "湘东大队",
              value: 32,
            },
            {
              label: "政秘股",
              value: 33,
            },
            {
              label: "车管股",
              value: 34,
            },
            {
              label: "秩序股",
              value: 35,
            },
            {
              label: "事故处理股",
              value: 36,
            },
            {
              label: "老关中队",
              value: 37,
            },
            {
              label: "麻山中队",
              value: 38,
            },
            {
              label: "城区中队",
              value: 39,
            },
            {
              label: "排上中队",
              value: 40,
            },
            {
              label: "白竺中队",
              value: 41,
            },
          ],
        },
        {
          label: "开发大队",
          departmentoptions: [
            {
              label: "开发大队",
              value: 42,
            },
            {
              label: "政秘股",
              value: 43,
            },
            {
              label: "秩序股",
              value: 44,
            },
            {
              label: "事故处理股",
              value: 45,
            },
            {
              label: "一中队",
              value: 46,
            },
            {
              label: "二中队",
              value: 47,
            },
            {
              label: "车管股",
              value: 48,
            },
            {
              label: "三中队",
              value: 49,
            },
            {
              label: "四中队",
              value: 50,
            },
            {
              label: "五中队",
              value: 51,
            },
          ],
        },
        {
          label: "科技科",
          departmentoptions: [
            {
              label: "科技科",
              value: 52,
            },
            {
              label: "信息集数股",
              value: 53,
            },
            {
              label: "交通监控股",
              value: 54,
            },
          ],
        },
        {
          label: "法制科",
          departmentoptions: [
            {
              label: "法制科",
              value: 55,
            },
            {
              label: "法制股",
              value: 56,
            },
            {
              label: "宣传股",
              value: 57,
            },
          ],
        },
        {
          label: "武功山大队",
          departmentoptions: [
            {
              label: "武功山大队",
              value: 58,
            },
          ],
        },
        {
          label: "指挥中心",
          departmentoptions: [
            {
              label: "指挥中心",
              value: 59,
            },
          ],
        },
      ],
    }
  },
  mounted() {
    this.handleQuery();
  },
  methods: {
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
    async handleQuery() {
      const result = await getListByCertificate(this.documentForm)
      if (result.code === 1) {
        console.log(result)
        this.dataList = result.data
      }
    },
    documentProcess(row) {
      this.$router.push({
        path: "/3/documentProcess",
        query: {
          name: row.name,
          id: row.id,
          // certificateStatus: row.certificateStatus
        }
      })
    },
    async handleSizeChange(size) {
      this.documentForm.limit = size
      const result = await getListByCertificate(this.documentForm)
      if (result.code === 1) {
        console.log(result)
        this.dataList = result.data
      }
    },
    async handleCurrentChange(currentPage) {
      this.documentForm.page = currentPage
      const result = await getListByCertificate(this.documentForm)
      if (result.code === 1) {
        console.log(result)
        this.dataList = result.data
      }
    },
    indexMethod(index) {
      return index + 1
    },
  }
}
</script>

<style scoped>
.card-group {
  padding: 10px 0px;
}

.pie-card {
  padding: 20px 10px;
}

.admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.title-card {
  height: 100%;
  padding: 10px 10px;
}
.label {
  color: #043580;
  padding: 0px 5px;
}

.search-form-box {
  padding: 0 20px;
}
.position-main {
  padding: 0 0;
}

.form-area {
  padding: 20px 20px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
