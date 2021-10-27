<template>
  <div class="admin-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="48" :sm="24" :lg="24">
        <el-card class="title-card">
          <div slot="header" class="clearfix">
            <el-row type="flex">
              <el-col span="24"
                ><div class="card-panel-text">设备管理——管理员</div></el-col
              >
              <!--el-button size="small" type="primary" @click="submitForm">导入excel表格</el-button-->
              <vue-xlsx-table @on-select-file="handleSelectedFile"
                ><span>导入excel表格</span></vue-xlsx-table
              >
            </el-row>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="gotosearch1">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">查看部门的设备分布</div>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="gotosearch2">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            查找设备的部门分布
          </div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="gotosearch3">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">查看具体设备分配</div>
          </div>
         
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="gotosearch4">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            手动添加设备
          </div>
        </div>
      </div>
    </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  name: "Admin0",
  data() {
    return {};
  },
  methods: {
    handleSelectedFile(convertedData) {
      let data = convertedData.body;
      console.log(data);
    },
    gotosearch1() {
      this.$router.push("/5/search1");
    },
    gotosearch2() {
      this.$router.push("/5/search2");
    },
    gotosearch3(){
      this.$router.push("/5/search3");
    },
    gotosearch4(){
      this.$router.push("/5/search4");
    }
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
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

.card-panel-col {
  padding: 32px;
}
.card-panel-text {
  line-height: 28px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}

</style>