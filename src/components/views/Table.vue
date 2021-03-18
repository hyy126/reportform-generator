<template>
  <a-table
    :dataSource="componentProp.dataSource"
    :columns="componentProp.columns"
    :rowKey="(record) => record.id"
  />
</template>

<script lang="ts">
import { ITableComponent } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    componentProp: Object as PropType<ITableComponent>,
  },
  setup() {},
});
</script>