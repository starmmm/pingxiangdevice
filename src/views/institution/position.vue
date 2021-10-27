t<template>
  <div class="admin-container">
    <router-view />

    <!-- <card-panel-of-position /> -->

    <el-row :gutter="40" class="card-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <el-row type="flex">
              <el-col span="24">
                <span>编制查询</span>
              </el-col>
              <el-button
                type="primary"
                size="small"
                @click="handleQuery"
              >查询</el-button>
              <el-button
                size="small"
                @click="resetForm('institutionForm')"
              >重置</el-button>
            </el-row>
          </div>

          <div class="form-area">
            <el-form
              ref="institutionForm"
              :inline="true"
              :model="institutionForm"
            >
              <el-row :gutter="10">
                <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
                  <el-form-item label="部门" prop="departmentId">
                    <el-select
                      v-model="institutionForm.departmentId"
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
                <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
                  <el-form-item label="职级" prop="currentRank">
                    <el-select
                      v-model="institutionForm.currentRank"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="rank in rankOptions"
                        :key="rank.value"
                        :value="rank.value"
                        :label="rank.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="9" :sm="9" :md="9" :lg="12" :xl="8">
                  <el-form-item label="入职区间" prop="interval">
                    <el-date-picker
                      v-model="institutionForm.interval"
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
            <span>查询结果</span>
          </div>
          <div class="form-area">
            <el-table :data="dataList.approveBasicInfoVoList" stripe>
              <el-table-column type="index" :index="indexMethod" />
              <el-table-column prop="name" align="center" label="姓名" />
              <el-table-column prop="department" align="center" label="部门" />
              <el-table-column prop="rankName" align="center" label="职级" />
              <el-table-column
                prop="workJoinDate"
                align="center"
                label="入职日期"
              />
              <el-table-column fixed="right" align="center" label="操作">
                <template slot-scope="scope" align="center">
                  <el-button
                    type="text"
                    @click="positionChange(scope.row)"
                  >部门调整</el-button>
                </template>
              </el-table-column>
              <el-table-column v-if="false" prop="id" />
              <el-table-column v-if="false" prop="rank" />
              <el-table-column v-if="false" prop="departmentId" />
            </el-table>
            <el-pagination
              :current-page="institutionForm.page"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="institutionForm.limit"
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
import { getBasicInfoList } from "../../apis/rankChange";
import decode from "../../enums/decode";

export default {
  name: "Institution",
  data() {
    return {
      institutionForm: {
        page: 1,
        limit: 5,
        departmentId: "",
        currentRank: "",
        interval: "",
        workJoinDateStart: 0,
        workJoinDateEnd: 0,
        isContainSubordinateInstitutions: 0
      },
      dataList: {},
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
      rankOptions: [
        {
          label: "见习辅警",
          value: 0,
        },
        {
          label: "一级辅警",
          value: 1,
        },
        {
          label: "二级辅警",
          value: 2,
        },
        {
          label: "三级辅警",
          value: 3,
        },
        {
          label: "四级辅警",
          value: 4,
        },
        {
          label: "五级辅警",
          value: 5,
        },
        {
          label: "六级辅警",
          value: 6,
        },
      ],
      defaultDepart: this.$route.params.id,
      defaultDepartName: this.$route.query.ID,
      superInsitutionIndex: [1, 5, 8, 9, 16, 24, 32, 42, 52, 55, 58, 59]
    };
  },
  mounted() {
    this.institutionForm.departmentId = this.getDefaultDepartmentValue();
    this.handleQuery();
  },

  methods: {
    getDefaultDepartmentValue() {
      for (const option of this.departmentoptions) {
        if (option.label === this.defaultDepartName) {
          for (const subOption of option.departmentoptions) {
            if (subOption.label === this.defaultDepartName) {
              return subOption.value;
            }
          }
        }
      }
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    async handleQuery() {
      this.institutionForm.currentRank = this.institutionForm.currentRank
        ? this.institutionForm.currentRank
        : null;
      this.institutionForm.workJoinDateStart = this.institutionForm.interval
        ? this.institutionForm.interval[0]
        : null;
      this.institutionForm.workJoinDateEnd = this.institutionForm.interval
        ? this.institutionForm.interval[1] + 86400000
        : null;
      this.institutionForm.isContainSubordinateInstitutions = this.superInsitutionIndex.includes(parseInt(this.institutionForm.departmentId)) ? 1 : 0;
      const result = await getBasicInfoList(this.institutionForm);
      if (result.code === 1) {
        this.dataList = result.data;
        for (const d of this.dataList.approveBasicInfoVoList) {
          d.workJoinDate = this.formatDate(d.workJoinDate);
          d.department = decode.departmentType[d.departmentId];
          d.rankName = decode.rankType[d.rank];
        }
      }
    },
    formatDate(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    },
    positionChange(row) {
      this.$router.push({
        path: "/1/positionChange",
        query: {
          adjustedPeopleId: row.id,
          adjustedPeopleName: row.name,
          oldDepartmentId: row.departmentId,
        },
      });
    },
    async handleSizeChange(size) {
      this.institutionForm.limit = size;
      this.institutionForm.isContainSubordinateInstitutions = this.superInsitutionIndex.includes(parseInt(this.institutionForm.departmentId)) ? 1 : 0;
      const result = await getBasicInfoList(this.institutionForm);
      if (result.code === 1) {
        this.dataList = result.data;
        for (const d of this.dataList.approveBasicInfoVoList) {
          d.workJoinDate = this.formatDate(d.workJoinDate);
          d.department = decode.departmentType[d.departmentId];
          d.rankName = decode.rankType[d.rank];
        }
      }
    },
    async handleCurrentChange(currentPage) {
      this.institutionForm.page = currentPage;
      this.institutionForm.isContainSubordinateInstitutions = this.superInsitutionIndex.includes(parseInt(this.institutionForm.departmentId)) ? 1 : 0;
      const result = await getBasicInfoList(this.institutionForm);
      if (result.code === 1) {
        this.dataList = result.data;
        for (const d of this.dataList.approveBasicInfoVoList) {
          d.workJoinDate = this.formatDate(d.workJoinDate);
          d.department = decode.departmentType[d.departmentId];
          d.rankName = decode.rankType[d.rank];
        }
      }
    },
    indexMethod(index) {
      return index + 1;
    },
  },
};
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
