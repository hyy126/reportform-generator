<template>
  <a-table
    :dataSource="componentProp.dataSource"
    :columns="componentProp.columns"
    :rowKey="(record) => record.id"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    componentProp: Object,
  },
  setup() {},
});
</script>

<style lang="less" scoped>
</style>
