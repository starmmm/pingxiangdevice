<template>
  <div>
    <el-table
    
      :data="dataSource"
      style="width: 100%"
      max-height="250"
    >
      <el-table-column
        v-for="c in columns"
        :key="c.prop"
        :prop="c.prop"
        :label="c.label"
        :width="c.width"
      >
        <div @click="onClick(c)">{{ dataSource[0][c.prop] }}</div>
      </el-table-column>
    </el-table>
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
      default: () => []
    }
  },
  methods: {
    onClick(item) {
      this.$emit("antiCheck",item.prop);
    }
  },
}
</script>

<style scoped>

</style>
