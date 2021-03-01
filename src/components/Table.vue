<template>
  <a-table
    :dataSource="componentProp.dataSource"
    :columns="componentProp.columns"
    :rowKey="(record) => record.id"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

import { useConfig } from "@/hooks/useConfig";

export default defineComponent({
  name: "Table",
  props: {
    componentProp: Object,
  },
  setup() {
    // const { columns, dataSource } = useConfig();
    // return {
    //   columns,
    //   dataSource,
    // };
  },
});
</script>

<style lang="less" scoped>
</style>
