<template>
  <a-table
    class="my-table"
    :dataSource="componentProp.dataSource"
    :columns="componentProp.columns"
    :rowKey="(record) => record.id"
    :bordered="tableConfig.bordered"
    :defaultExpandAllRows="tableConfig.defaultExpandAllRows"
    :childrenColumnName="tableConfig.childrenColumnName"
    :loading="tableConfig.loading"
    :scroll="tableConfig.scroll"
    :show-header="tableConfig.showHeader"
    :size="tableConfig.size"
    :row-selection="tableConfig.rowSelection"
    :row-className="tableConfig.rowClassName"
    @change="tableChange"
  ></a-table>
</template>

<script lang="ts">
import { ITableComponent } from "@/typings";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    componentProp: Object as PropType<ITableComponent>,
  },
  setup(prop) {
    const tableConfig = prop.componentProp?.tableConfig;

    const tableChange = (...args: any[]) => {
      console.log(args);
    };

    return {
      tableConfig,
      tableChange,
    };
  },
});
</script>

<style lang="less" scoped>
.my-table:deep(.table-striped) {
  background-color: #fafafa;
}
</style>