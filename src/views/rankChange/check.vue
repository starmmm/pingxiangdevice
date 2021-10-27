<template>

  <div class="admin-container">
    <el-page-header class="goback" @back="goBack" />
    <router-view />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <span>职级调整审核</span>
          </div>
          <el-table
            stripe
            :data="tableDataSource"
            style="width: 100%"
            :header-cell-style="{ textAligh: 'center' }"
            class="check-table"
          >
            <el-table-column type="index" :index="indexMethod" />
            <el-table-column
              v-for="c in tableColumns"
              :key="c.prop"
              :prop="c.prop"
              :label="c.label"
              align="center"
            />
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  v-show="showButton(scope.row)"
                  type="primary"
                  size="mini"
                  @click="approve(scope.row)"
                >批准</el-button>
                <el-button
                  v-show="showButton(scope.row)"
                  type="danger"
                  size="mini"
                  @click="disapprove(scope.row)"
                >
                  拒绝</el-button>
              </template>
            </el-table-column>
            <el-table-column v-if="false" prop="id" />
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
import {reviewRankApplication, getAllRankApplicationList} from "../../apis/rankChange"
import decode from "../../enums/decode"

export default {
  name: "RankCheck",
  data() {
    return {
      reviewerId: this.$store.state.user.id,
      getTableForm: {
        page: 1,
        limit: 10,
      },
      tableDataSource: [],
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
          prop: "submitterName",
          label: "申请人"
        },
        {
          prop: "reviewStatus",
          label: "审核状态",
        },
      ],
      dataList: {}
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      const result = await getAllRankApplicationList(this.getTableForm);
      this.dataList = result.data;
      this.tableDataSource = result.data.approveVoList;
      for (const d of this.tableDataSource) {
        d.oldData = decode.rankType[d.oldData]
        d.newData = decode.rankType[d.newData]
        d.reviewStatus = decode.reviewStatusType[d.reviewStatus]
      }
    },
    goBack() {
      this.$router.push("./rank");
    },
    async approve(item) {
      const select = {
        approveId: item.id,
        reviewerId: this.reviewerId,
        reviewStatus: 1,
      };
      const result = await reviewRankApplication(select);
      if (result.code === 1) {
        this.$alert("已批准该申请", {
          confirmButtonText: "确定",
        });
        this.getTableData()
      } else {
        alert("提交失败！")
      }
    },
    async disapprove(item) {
      const select = {
        approveId: item.id,
        reviewerId: this.reviewerId,
        reviewStatus: 0,
      };
      const result = await reviewRankApplication(select);
      if (result.code === 1) {
        this.$alert("已批准该申请", {
          confirmButtonText: "确定",
        });
        this.getTableData()
      } else {
        alert("提交失败！")
      }
    },
    showButton(value) {
      if (value.reviewStatus === "待审核") {
        return true;
      } else {
        return false;
      }
    },
    indexMethod(index) {
      return index + 1
    },
    async handleSizeChange(size) {
      this.getTableForm.limit = size;
      this.getTableData();
    },
    async handleCurrentChange(currentPage) {
      this.getTableForm.page = currentPage;
      this.getTableData();
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
