<template>
  <div class="check-container">
    <table-sheet
      :title="title"
      :initial-data="data"
      :table-props="tableProps"
      :loading="loading"
      @change="handleChange"
    />
  </div>
</template>

<script>
import TableSheet from "@/components/TableSheet";
import { tableProps } from "@/api-data/infoset/example1";

const requestData = async () => {
  const data = {
    name: "小明",
    sex: "男",
    date: "1877/01/12",
    age: 18,
    address: "江西省大安市平安县平安楼区1229号",
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};
const uploadData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
export default {
  name: "Check",
  components: {
    TableSheet,
  },
  data() {
    return {
      title: "基本信息",
      data: null,
      tableProps,
      loading: false,
    };
  },

  async mounted() {
    this.loading = true;
    try {
      const data = await requestData();
      this.data = data;
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.$message.error("数据更新失败" + JSON.stringify(err));
    }
  },
  methods: {
    async handleChange(data) {
      this.loading = true;
      try {
        await uploadData();
        this.loading = false;
        this.data = data;
        this.$message.success("数据更新成功");
      } catch (err) {
        this.loading = false;
        // 这句必须添加，告知 TableSheet 组件数据更新失败
        this.data = Object.assign({}, this.data);
        this.$message.error("数据更新失败" + JSON.stringify(err));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.check {
  &-container {
    margin: 30px;
  }
}
</style>
