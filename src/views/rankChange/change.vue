<template>
  <div class="admin-container">
    <el-page-header class="goback" @back="goBack" />
    <router-view />
    <el-row :gutter="40" class="card-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">

          <div slot="header" class="clearfix">
            <el-row type="flex">
              <el-col span="24"><span>职级调整申请</span></el-col>
              <el-button size="small" type="primary" @click="submitForm">提交</el-button>
            </el-row>
          </div>

          <el-form
            ref="inputForm"
            :inline="true"
            :model="inputForm"
            class="input-form"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item
                  size="small"
                  label="被调整人员姓名"
                  prop="adjustedPeopleName"
                >
                  <el-input v-model="adjustedPeopleName" readonly />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="目前所在职级" prop="oldRank" size="small">
                  <el-select v-model="inputForm.oldRank" disabled>
                    <el-option
                      v-for="rank in rankOptions"
                      :key="rank.value"
                      :value="rank.value"
                      :label="rank.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="调整所在职级" prop="newRank" size="small">
                  <el-select v-model="inputForm.newRank" placeholder="请选择">
                    <el-option
                      v-for="rank in rankOptions"
                      :key="rank.value"
                      :value="rank.value"
                      :label="rank.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="40" class="card-group">

      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <el-row type="flex">
              <el-col span="24"><span>职级调整状态查询</span></el-col>
              <!-- <el-button size="small" type="primary" @click="checkForm">个人请求更新</el-button> -->
            </el-row>
          </div>

          <el-table
            :data="tableDataSource"
            stripe
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
            class="check-table"
          >
            <el-table-column
              v-for="c in tableColumns"
              :key="c.prop"
              :prop="c.prop"
              :label="c.label"
              align="center"
            />
          </el-table>
          <el-pagination
            :current-page="getTableForm.page"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="getTableForm.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataList.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {submitRankApplication, getRankApplicationList} from "../../apis/rankChange"
import decode from "../../enums/decode"

export default {
  name: "RankChange",
  data() {
    return {
      adjustedPeopleName: this.$route.query.adjustedPeopleName,
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
        }
      ],
      inputForm: {
        submitterId: this.$store.state.user.id,
        adjustedPeopleId: this.$route.query.adjustedPeopleId,
        oldRank: parseInt(this.$route.query.oldRank),
        newRank: "",
      },
      getTableForm: {
        page: 1,
        limit: 10,
        submitterId: this.submitterId
      },
      tableColumns: [
        {
          prop: "adjustedName",
          label: "被调整人员姓名",
        },
        {
          prop: "oldData",
          label: "目前所在职级",
        },
        {
          prop: "newData",
          label: "调整所在职级",
        },
        {
          prop: "reviewStatus",
          label: "请求状态",
        },
      ],
      tableDataSource: [],
      dataList: {}
    };
  },
  mounted() {
    this.getTableData();
    this.inputForm.oldRank = this.$route.query.oldRank ? parseInt(this.$route.query.oldRank) : ""
    this.getTableData();
  },
  methods: {
    goBack() {
      this.$router.push("./rank");
    },
    GoToInstitution() {
      this.$router.push("./institution");
    },
    submitForm() {
      this.applyRankChange();
      this.getTableData();
    },
    // checkForm() {
    //   this.getTableData();
    //   this.$alert("状态已更新", {
    //     confirmButtonText: "确定",
    //   });
    // },
    async applyRankChange() {
      const result = await submitRankApplication(this.inputForm)
      if (result.code === 1) {
        this.$alert("提交成功，请在下方窗口查看请求状态", {
          confirmButtonText: "确定",
        });
        this.getTableData()
      } else {
        alert("提交失败！")
      }
    },
    async getTableData() {
      const result = await getRankApplicationList(this.getTableForm)
      this.dataList = result.data
      this.tableDataSource = result.data.approveVoList
      for (const d of this.tableDataSource) {
        d.oldData = decode.rankType[d.oldData]
        d.newData = decode.rankType[d.newData]
        d.reviewStatus = decode.reviewStatusType[d.reviewStatus]
      }
    },
    async handleSizeChange(size) {
      this.getTableForm.limit = size
      this.getTableData()
    },
    async handleCurrentChange(currentPage) {
      this.getTableForm.page = currentPage
      this.getTableData()
    },
  },
};
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

.status-box {
  font-size: 12px;
  color: darkgray;
}

.button-info{
  padding:10px 0px;
}

.goback{
  padding:10px 0px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
