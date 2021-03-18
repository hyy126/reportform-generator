<template>
  <section class="TableConfig-wrapper">
    <a-divider>列属性</a-divider>

    <ChangeList :list="columns" @addColumn="addColumn">
      <template #default="scope">
        <a-input v-model:value="scope.item.title" placeholder="列名" />
        <a-input v-model:value="scope.item.dataIndex" placeholder="列值" />
      </template>
      <template #footer>
        <i class="iconfont icongengduo" @click="visible = true"></i>
      </template>
    </ChangeList>

    <a-divider>测试数据</a-divider>
    <a-textarea
      v-model:value="dataSourceStr"
      auto-size
      placeholder="测试数据"
    />
  </section>
  <a-modal
    v-model:visible="visible"
    width="1200px"
    centered
    title="表格列配置"
    :footer="null"
  >
    <TableColumnConfig />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useTableConfig } from "@/hooks/useTableConfig";
import ChangeList from "@/components/common/ChangeList.vue";

import TableColumnConfig from "./table/TableColumnConfig2.vue";

export default defineComponent({
  name: "TableConfig",
  components: { ChangeList, TableColumnConfig },
  props: ["componentProp", "formAttribute"],
  setup() {
    const { columns, dataSource, changeData, addColumn } = useTableConfig();

    const dataSourceStr = ref(JSON.stringify(dataSource.value, null, 2));

    watch(dataSource, () => {
      dataSourceStr.value = JSON.stringify(dataSource.value, null, 2);
    });

    watch(dataSourceStr, () => {
      try {
        changeData("dataSource", JSON.parse(dataSourceStr.value || "[]"));
      } catch (error) {
        console.log("异常:::", dataSourceStr.value);
      }
    });

    const visible = ref<boolean>(false);

    return {
      columns,
      dataSourceStr,
      addColumn,
      visible,
    };
  },
});
</script>

<style lang="less" scoped>
.TableConfig-wrapper {
  .col-edit-wrapper {
    display: flex;
    align-items: center;
    height: 32px;
    margin: 5px 0;
    .iconpaixu {
      font-size: 20px;
      cursor: move;
      &:hover {
        color: @mainThemeColor;
      }
    }
    .iconjian {
      color: red;
      font-size: 24px;
      cursor: pointer;
    }
    input {
      margin: 0 5px;
    }
  }
  .icongengduo {
    cursor: pointer;
    &:hover {
      color: @mainThemeColor;
    }
  }
}
</style>
