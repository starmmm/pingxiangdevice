<template>
  <div class="admin-container">
    <router-view />

    <el-row :gutter="40" class="panel-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <el-row type="flex">
              <el-col span="24"><span>人员信息查询</span></el-col>
              <el-upload
                ref="upload"
                style="width: 200px"
                class="upload"
                action="string"
                accept=".xlsx"
                :http-request="submitPoliceExcel"
              >
                <el-button
                  size="small"
                  style="margin-left: 150px"
                >辅警信息导入</el-button>
              </el-upload>

              <el-button
                type="primary"
                size="small"
                style="margin-left: 100px"
                @click="onSubmit('inputForm')"
              >查询</el-button>
            </el-row>
          </div>
          <div class="form-area">
            <el-form ref="inputForm" :inline="true" :model="inputForm">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="inputForm.name" size="small" />
                  </el-form-item>
                </el-col>

                <el-col :span="7">
                  <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker
                      v-model="inputForm.birthday"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="timestamp"
                      size="small"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="性别" prop="gender">
                    <el-select v-model="inputForm.gender" size="small">
                      <el-option label="男" value="1" />
                      <el-option label="女" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" justify="end">
                <el-upload
                  ref="upload"
                  style="width: 200px"
                  class="upload"
                  action="string"
                  accept=".xlsx"
                  :http-request="submitPoliceExcel"
                />
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="40" class="panel-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <span>查询结果</span>
          </div>
          <el-table
            :data="tableDataSource"
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
          >
            <el-table-column
              v-for="c in tableColumns"
              :key="c.prop"
              align="center"
              :prop="c.prop"
              :label="c.label"
            />
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="showDetail(scope.row)"
                >详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <!-- <el-pagination
              layout="prev, pager, next"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              @current-change="handlePageChange"
            /> -->
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSidebar } from "@/apis/basicinfo";
import request from "@/apis/request";
import decode from "@/enums/decode";
import { getTime } from "../asPoliceInfo";
import { uploadFile } from "../../apis/user";

export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      treeData: [],
      departmentId: "1",
      inputForm: {
        name: null,
        gender: null,
        birthday: null,
        status: null,
        isContainSubordinateInstitutions: "0",
      },
      tableDataSource: [],
      tableColumns: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "gender",
          label: "性别",
        },
        {
          prop: "birthday",
          label: "出生日期",
        },
        {
          prop: "nativePlace",
          label: "籍贯",
        },
        {
          prop: "bloodType",
          label: "血型",
        },
        {
          prop: "folk",
          label: "民族",
        },
        {
          prop: "policeNumber",
          label: "警号",
        },
      ],
      total: 20,
      options: [
        {
          label: "在职",
          options: [
            {
              value: 101,
              label: "见习",
            },
            {
              value: 102,
              label: "在职领导",
            },
            {
              value: 103,
              label: "在职非领导",
            },
            {
              value: 104,
              label: "离休调养",
            },
            {
              value: 109,
              label: "聘用",
            },
            {
              value: 199,
              label: "其他在职人员",
            },
          ],
        },
        {
          label: "离退",
          options: [
            {
              value: 201,
              label: "离休",
            },
            {
              value: 202,
              label: "退休",
            },
            {
              value: 203,
              label: "退职",
            },
          ],
        },
        {
          label: "调出",
          options: [
            {
              value: 301,
              label: "调出",
            },
            {
              value: 302,
              label: "辞职",
            },
            {
              value: 303,
              label: "辞退",
            },
            {
              value: 304,
              label: "开除",
            },
            {
              value: 305,
              label: "取消录用",
            },
          ],
        },
        {
          label: "已去世",
          options: [
            {
              value: 401,
              label: "因公牺牲",
            },
            {
              value: 402,
              label: "在职病故",
            },
            {
              value: 403,
              label: "意外死亡",
            },
            {
              value: 404,
              label: "离退去世",
            },
          ],
        },
        {
          label: "其他人员",
          options: [
            {
              value: 9,
              label: "其他人员",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getSidebarData();
    this.getTableData();
  },
  methods: {
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
      this.getTableData();
    },
    showDetail(item) {
      this.$router.push({
        path: `/basicInfo/info/${item.id}`,
      });
    },
    infoCheck(item) {
      console.log(item);
      // this.getInfoAssembly(item);
    },
    async getInfoAssembly(item) {
      return request
        .post("", item)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    async getTable(obj) {
      this.tableDataSource = [];
      return request
        .post("/basicInfo/getList", obj)
        .then((res) => {
          if (res.data.basicInfoVoList.length) {
            const tmp = res.data.basicInfoVoList;
            for (let i = 0; i < tmp.length; i++) {
              const folkobj = decode.folk;
              const genderobj = decode.gender;
              const bloodTypeobj = decode.bloodType;
              const persontypeobj = decode.personnelType;
              const placeobj = decode.place;
              this.tableDataSource.push({
                id: tmp[i].id,
                name: tmp[i].name,
                policeNumber: tmp[i].policeNumber,
                birthday: getTime(tmp[i].birthday),
                gender: genderobj[tmp[i].gender],
                nativePlace: placeobj[tmp[i].nativePlace],
                bloodType: bloodTypeobj[tmp[i].bloodType],
                folk: folkobj[tmp[i].folk],
                persontype: persontypeobj[tmp[i].personnelType],
              });
              this.total = res.data.total;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getTableData() {
      try {
        const selected = {
          ...this.inputForm,
          departmentId: this.departmentId,
          page: this.currentPage,
          limit: 5,
        };
        this.getTable(selected);
      } catch (err) {
        console.log(err);
      }
    },
    async getSidebarData() {
      const sidebarInfo = await getSidebar();
      this.treeData = sidebarInfo;
    },
    onSubmit() {
      this.getTableData();
    },
    handleNodeClick(data) {
      this.departmentId = data.did;
    },
    async submitPoliceExcel(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      const url = "/basicInfo/importExcel";
      const result = await uploadFile(url, formData);
      if (result.code === 1) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.getTableData();
        this.$router.go(0);
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
    },
  },
};
</script>
<style lang="scss" scoped>
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
  .panel-group {
    padding: 10px;
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
</style>
