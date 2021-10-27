<template>
  <div>
    <el-table :data="dataSource" border style="width:100%">
      <el-table-column
        v-for="c in columns"
        :key="c.prop"
        :prop="c.prop"
        :label="c.label"
        :width="c.width"
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
      default: 25,
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
  methods: {
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
      this.$emit("onPageChange", currentPage);
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
