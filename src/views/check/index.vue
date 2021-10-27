<template>
  <div class="admin-container">
    <router-view />
    <el-row :gutter="40" class="card-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <el-row type="flex">
              <el-col span="24"><span>自定义数据核查</span></el-col>
              <el-button size="small" type="primary" @click="onSubmit()"> 查询</el-button>
              <el-button
                size="small"
                @click="resetForm('checkForm')"
              >重置
              </el-button>
            </el-row>
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
                  <el-form-item
                    label="所在单位"
                    prop="departmentId"
                    size="small"
                  >
                    <el-select
                      v-model="checkForm.departmentId"
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
                <!-- <el-col :span="8">
                  <el-form-item label="人员状态" prop="status" size="small">
                    <el-select
                      v-model="checkForm.status"
                      placeholder="请选择"
                      multiple
                    >
                      <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="card-group">
      <el-card class="title-card">
        <div slot="header" class="clearfix">
          <el-row type="flex">
            <el-col span="24"><span>数据核查结果</span></el-col>
            <el-button
              size="small"
              @click="exportExcel1"
            >导出excel</el-button>
          </el-row>
        </div>
        <div class="form-area">
          <table-number
            id="out-table1"
            :data-source="tableDataSource"
            :columns="tableColumns"
            @antiCheck="onCheck"
          />
        </div>
      </el-card>
    </el-row>

    <el-row class="card-group">

      <el-card class="title-card">
        <div slot="header" class="clearfix">
          <el-row type="flex">
            <el-col span="24"><span>数据反核查结果</span></el-col>
            <el-button
              size="small"
              @click="exportExcel2"
            >导出excel</el-button>
          </el-row>
        </div>
        <div class="form-area">
          <table-page
            id="out-table2"
            :data-source="antitableDataSource"
            :columns="antitableColumns"
            :page-size="5"
            @onPageChange="handlePageChange"
          />
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import TablePage from "./TablePage.vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import request from "@/apis/request";
import TableNumber from "./TableNumber.vue";
import decode from "@/enums/decode";

export default {
  name: "Check",
  components: {
    TablePage,
    TableNumber,
  },
  data() {
    return {
      allstatus: [
        {
          value: "",
          label: "",
        },
      ],
      antitableDataSource: [{}],
      antitableColumns: [
        {
          prop: "id",
          label: "id",
        },
        {
          prop: "department",
          label: "部门",
        },
        {
          prop: "abbreviationOfPosition",
          label: "职位简称",
        },
        {
          prop: "accountType",
          label: "户口性质",
        },
        // {
        //   prop: "annualAssessment",
        //   label: "年度考核综述",
        // },
        {
          prop: "awards",
          label: "奖励综述",
        },
        {
          prop: "birthday",
          label: "出生日期",
        },
        {
          prop: "birthplace",
          label: "出生地",
        },
        {
          prop: "bloodType",
          label: "血型",
        },
        // {
        //   prop: "correctionValueOfWorkingYears",
        //   label: "工龄计算校正值",
        // },
        // {
        //   prop: "dateOfJoiningTheOrganizations",
        //   label: "参加组织日期",
        // },
        // {
        //   prop: "departmentAndPoliceType",
        //   label: "部门与警种",
        // },
        // {
        //   prop: "detailedLocationOfRegisteredResidence",
        //   label: "户籍所在详细地址",
        // },
        {
          prop: "folk",
          label: "民族",
        },
        {
          prop: "fullNameOfPosition",
          label: "职务全称",
        },
        {
          prop: "gender",
          label: "性别",
        },
        {
          prop: "growingPlace",
          label: "成长地",
        },
        {
          prop: "healthCondition",
          label: "健康状况",
        },
        // {
        //   prop: "idNumber",
        //   label: "居民身份号码",
        // },
        // {
        //   prop: "identificationOfAssistantCadres",
        //   label: "协管干部标识",
        // },
        {
          prop: "identity",
          label: "个人身份",
        },
        {
          prop: "managementCategory",
          label: "管理类别",
        },
        {
          prop: "maritalStatus",
          label: "婚姻状况",
        },
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "nativePlace",
          label: "籍贯",
        },
        {
          prop: "personnelType",
          label: "人员类别",
        },
        {
          prop: "policeNumber",
          label: "警号",
        },
        // {
        //   prop: "policeRankSchoolingLength",
        //   label: "警衔应加学制年限",
        // },
        // {
        //   prop: "policeWorkJoinDate",
        //   label: "参加公安工作日期",
        // },
        // {
        //   prop: "politicalStatus",
        //   label: "政治面貌",
        // },
        // {
        //   prop: "postponeReason",
        //   label: "暂缓列入套改实施范围",
        // },
        // {
        //   prop: "registerResidenceLocation",
        //   label: "户籍所在地名称",
        // },
        // {
        //   prop: "remarks",
        //   label: "备注",
        // },
        // {
        //   prop: "staffPosition",
        //   label: "人员工作岗位",
        // },
        // {
        //   prop: "status",
        //   label: "人员状态",
        // },
        // {
        //   prop: "talent",
        //   label: "专长",
        // },
        // {
        //   prop: "timeOfWorkAtGrassRootsLevel",
        //   label: "基层工作经历时间",
        // },
        // {
        //   prop: "workJoinDate",
        //   label: "参加工作日期",
        // },
        // {
        //   prop: "workplaceCode",
        //   label: "单位代码",
        // },
        // {
        //   prop: "workplace",
        //   label: "工作单位代码",
        // },
        // {
        //   prop: "workplaceName",
        //   label: "关系所在单位",
        // },
      ],
      checkForm: {
        departmentId: "",
        status: "",
        containLowerDepartment: false,
      },
      isContainHistoryRecords: false,
      columns: [
        {
          value: "A01",
          label: "A01基本信息集",
        },
        {
          value: "A02",
          label: "A02基本信息集",
        },
      ],
      currentPage: 1,
      limit: 5,
      total: 10,
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
      ranges: [
        {
          value: "",
          label: "",
        },
      ],
      tableData: Object,
      tableDataSource: [
        {
          type: "0",
          position: "0",
          more: "0",
        },
      ],
      tableColumns: [
        {
          prop: "noneNameList",
          label: "姓名",
        },
        {
          prop: "noneGenderList",
          label: "性别",
        },
        {
          prop: "noneFolkList",
          label: "民族",
        },
        {
          prop: "noneIdentityList",
          label: "个人身份",
        },
        {
          prop: "noneNativePlaceList",
          label: "籍贯",
        },
        {
          prop: "noneAbbreviationOfPositionList",
          label: "职位简称",
        },
        {
          prop: "noneAccountTypeList",
          label: "户口性质",
        },
        // {
        //   prop: "noneAnnualAssessmentList",
        //   label: "年度考核综述",
        // },
        // {
        //   prop: "noneAwardsList",
        //   label: "奖励综述",
        // },
        {
          prop: "noneBirthdayList",
          label: "出生日期",
        },
        {
          prop: "noneBirthplaceList",
          label: "出生地",
        },
        {
          prop: "noneBloodTypeList",
          label: "血型",
        },
        // {
        //   prop: "noneCorrectionValueOfWorkingYearsList",
        //   label: "工龄计算校正值",
        // },
        // {
        //   prop: "noneDateOfJoiningTheOrganizationsList",
        //   label: "参加组织日期",
        // },
        // {
        //   prop: "noneDepartmentAndPoliceTypeList",
        //   label: "人员所属部门和警种",
        // },
        // {
        //   prop: "noneDetailedLocationOfRegisteredResidenceList",
        //   label: "户籍所在详细地址",
        // },

        // {
        //   prop: "noneFullNameOfPositionList",
        //   label: "职务全称",
        // },

        // {
        //   prop: "noneGrowingPlaceList",
        //   label: "成长地",
        // },
        // {
        //   prop: "noneHealthConditionList",
        //   label: "健康状况",
        // },
        // {
        //   prop: "noneIdNumberList",
        //   label: "居民身份号码",
        // },
        // {
        //   prop: "noneIdentificationOfAssistantCadresList",
        //   label: "协管干部标识",
        // },

        // {
        //   prop: "noneManagementCategoryList",
        //   label: "管理类别",
        // },
        // {
        //   prop: "noneMaritalStatusList",
        //   label: "婚姻状况",
        // },

        // {
        //   prop: "nonePersonnelTypeList",
        //   label: "人员类别",
        // },
        // {
        //   prop: "nonePoliceNumberList",
        //   label: "警号",
        // },
        // {
        //   prop: "nonePoliceRankSchoolingLengthList",
        //   label: "警衔应加学制年限",
        // },
        // {
        //   prop: "nonePoliceWorkJoinDateList",
        //   label: "参加公安工作日期",
        // },
        // {
        //   prop: "nonePoliticalStatusList",
        //   label: "政治面貌",
        // },
        // {
        //   prop: "nonePostponeReasonList",
        //   label: "暂缓列入套改实施范围",
        // },
        // {
        //   prop: "noneRegisterResidenceLocationList",
        //   label: "户籍所在地名称",
        // },
        // {
        //   prop: "noneStaffPositionList",
        //   label: "人员工作岗位",
        // },
        // {
        //   prop: "noneStatusList",
        //   label: "人员状态",
        // },
        // {
        //   prop: "noneTalentList",
        //   label: "专长",
        // },
        // {
        //   prop: "noneTimeOfWorkAtGrassRootsLevelList",
        //   label: "基层工作经历时间",
        // },
        // {
        //   prop: "noneWorkJoinDateList",
        //   label: "参加工作日期",
        // },
        // {
        //   prop: "noneWorkplaceCodeList",
        //   label: "单位代码",
        // },
        // {
        //   prop: "noneWorkplaceList",
        //   label: "工作单位代码",
        // },
        // {
        //   prop: "noneWorkplaceNameList",
        //   label: "关系所在单位",
        // },
      ],
      tempobj: Object,
      tableDataList: [],
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
  methods: {
    exportExcel1() {
      const excelTable = XLSX.utils.table_to_book(
        document.querySelector("#out-table1")
      );
      const excelAbout = XLSX.write(excelTable, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([excelAbout], { type: "application/octet-stream" }),
          "tablejs.xlsx"
        );
      } catch (e) {
        console.log(e, excelAbout);
      }
      return excelAbout;
    },
    exportExcel2() {
      const excelTable = XLSX.utils.table_to_book(
        document.querySelector("#out-table2")
      );
      const excelAbout = XLSX.write(excelTable, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([excelAbout], { type: "application/octet-stream" }),
          "tablejs.xlsx"
        );
      } catch (e) {
        console.log(e, excelAbout);
      }
      return excelAbout;
    },
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
      this.getTableData();
    },
    async getTable(obj) {
      return request
        .get("/basicInfo/getNoneNumber", {
          params: obj,
        })
        .then((res) => {
          if (res) {
            const dataObj = res.data;
            this.tempobj = dataObj;
            this.tableDataSource = [
              Object.keys(dataObj).reduce((prev, currKey) => {
                prev[currKey] = dataObj[currKey].length;
                return prev;
              }, {}),
            ];
            console.log(this.tableData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getcheckData() {
      try {
        if (this.checkForm.containLowerDepartment === false) {
          this.checkForm.containLowerDepartment = 0;
        } else this.checkForm.containLowerDepartment = 1;
        this.checkForm.status = this.checkForm.status.toString();
        const selected = this.checkForm;
        this.getTable(selected);
      } catch (err) {
        console.log(err);
      }
    },
    async getanticheckData() {},
    onSubmit() {
      this.getcheckData();
    },
    resetForm(checkForm) {
      if (this.$refs[checkForm] !== undefined) {
        this.$refs[checkForm].resetFields();
      }
    },
    onCheck(prop) {
      const page = this.currentPage;
      const limit = this.limit;
      const idList = this.tempobj[prop].join(",");
      const selected = {
        idList,
        page,
        limit,
      };
      return request
        .get("/basicInfo/getEmptyInfoPage", {
          params: selected,
        })
        .then((res) => {
          if (res.data) {
            // 解码部分代码 复杂部分或许可以考虑高阶函数封装
            const tmp = res.data.emptyBasicInfoVoList;

            var folkobj = decode.folk;
            var genderobj = decode.gender;
            var bloodTypeobj = decode.bloodType;
            // columns还没加入这行的props
            // var postponeReasonobj=decode.postponeReason;
            var politicalStatusobj = decode.politicalStatus;
            var identificationOfAssistantCadresobj =
              decode.identificationOfAssistantCadres;
            var managementCategoryobj = decode.managementCategory;
            var statusobj = decode.status;
            var persontypeobj = decode.personnelType;
            var identityobj = decode.identity;
            var maritalStatusobj = decode.maritalStatus;
            var healthConditionobj = decode.healthCondition;
            var departmentAndPoliceTypeAndStaffPositionobj =
              decode.departmentAndPoliceTypeAndStaffPosition;
            var placeobj = decode.place;

            this.antitableDataSource = tmp;
            this.antitableDataSource.folk = folkobj[tmp.folk];
            this.antitableDataSource.gender = genderobj[tmp.gender];
            this.antitableDataSource.bloodType = bloodTypeobj[tmp.bloodType];
            // columns还没加入这行的props
            // this.antitableDataSource.postponeReasonobj=postponeReasonobj[tmp.postponeReason];
            this.antitableDataSource.politicalStatus =
              politicalStatusobj[tmp.politicalStatus];
            this.antitableDataSource.identificationOfAssistantCadres =
              identificationOfAssistantCadresobj[
                tmp.identificationOfAssistantCadres
              ];
            this.antitableDataSource.managementCategory =
              managementCategoryobj[tmp.managementCategory];
            this.antitableDataSource.status = statusobj[tmp.status];
            this.antitableDataSource.personnelType =
              persontypeobj[tmp.persontype];
            this.antitableDataSource.identity = identityobj[tmp.identity];
            this.antitableDataSource.maritalStatus =
              maritalStatusobj[tmp.maritalStatus];
            this.antitableDataSource.healthCondition =
              healthConditionobj[tmp.healthCondition];
            this.antitableDataSource.departmentAndPolicetype =
              departmentAndPoliceTypeAndStaffPositionobj[
                tmp.departmentAndPoliceTypeAndStaffPosition
              ];
            this.antitableDataSource.staffPosition =
              departmentAndPoliceTypeAndStaffPositionobj[
                tmp.departmentAndPoliceTypeAndStaffPosition
              ];
            this.antitableDataSource.place = placeobj[tmp.place];

            this.total = res.data.total;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-group {
  padding: 10px 0px;
}

.admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.title-card {
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

.panel-group {
  padding: 10px;
}
</style>
