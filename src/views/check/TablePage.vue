<template>
  <div>
    <el-table :data="dataSource" style="width: 100%" max-height="250">
      <el-table-column
        v-for="c in columns"
        :key="c.prop"
        :prop="c.prop"
        :label="c.label"
        :width="c.width"
        @click="openDetails(c.label)"
      />
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  mounted() {
    console.log(this.dataSource);
  },
  methods: {
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
      this.$emit("onPageChange", currentPage);
    },
    openDetails(label) {
      this.$emit("openDetails", label);
    },
  },
};
</script>

<style scoped>
.pagination {
  text-align: right;
  margin: 20px 10px;
}
</style>
