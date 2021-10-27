<!--
 * @author Pengyu
 * @brief 表单组件
 * @example
    <table-sheet
      :title="title"
      :initial-data="data"
      :table-props="tableProps"
      :loading="loading"
      @change="handleChange"
    />
-->
<template>
  <div>
    <div class="row">
      <h3 class="title">{{ title }}</h3>
      <img
        v-if="!canEdit"
        src="@/assets/icons/edit.svg"
        alt="edit"
        @click="editClick"
      />
      <template v-else>
        <el-button
          type="primary"
          round
          size="small"
          @click="changeClick('dataform')"
        >提交</el-button>
        <el-button
          type="info"
          round
          size="small"
          @click="cancelClick"
        >取消</el-button>
      </template>
    </div>
    <el-form
      ref="dataform"
      v-loading.sync="loading"
      :model="tableData"
      :disabled="!canEdit"
      class="demo-form-inline"
    >
      <div v-if="tableData" class="form-item-container">
        <div
          v-for="item in tableProps"
          :key="item.key"
          class="form-item-box"
          :class="`item-width-${item.styles.width || 3}`"
        >
          <el-form-item
            :prop="item.key"
            :label="item.label"
            :rules="item.rules"
          >
            <el-date-picker
              v-if="item.dataType === 'date'"
              v-model="tableData[item.key]"
            />

            <el-select
              v-else-if="item.dataType === 'select'"
              v-model="tableData[item.key]"
            >
              <template v-for="option in item.options">
                <el-option
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </template>
            </el-select>

            <el-input
              v-else-if="item.dataType === 'number'"
              v-model.number="tableData[item.key]"
            />
            <el-input v-else v-model="tableData[item.key]" />
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "TableSheet",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    initialData: {
      type: Object,
      default: null,
    },
    tableProps: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      tableData: null,
      canEdit: false,
    };
  },
  watch: {
    initialData() {
      this.tableData = Object.assign({}, this.initialData);
    },
  },
  methods: {
    changeClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("change", this.tableData);
          this.canEdit = false;
        } else {
          return false;
        }
      });
    },
    cancelClick() {
      this.tableData = Object.assign({}, this.initialData);
      this.canEdit = false;
    },
    editClick() {
      this.canEdit = true;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
}
.title {
  margin-right: 10px;
}
.row img {
  width: 25px;
  height: 25px;
}
.form-item-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.form-item-box {
  box-sizing: border-box;
  margin-right: 4%;
}
.item-width-1 {
  width: 96%;
}
.item-width-2 {
  width: 46%;
}
.item-width-3 {
  width: 29%;
}
</style>
