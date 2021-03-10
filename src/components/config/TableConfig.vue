<template>
  <section class="TableConfig-wrapper">
    <a-divider>列属性</a-divider>

    <ChangeList :list="columns" @addColumn="addColumn">
      <template #default="scope">
        <a-input v-model:value="scope.item.title" placeholder="列名" />
        <a-input v-model:value="scope.item.dataIndex" placeholder="列值" />
      </template>
    </ChangeList>

    <a-divider>测试数据</a-divider>
    <a-textarea
      v-model:value="dataSourceStr"
      auto-size
      placeholder="测试数据"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { useTableConfig } from "@/hooks/useTableConfig";

import ChangeList from "@/components/common/ChangeList.vue";

let uuid = 3;

export default defineComponent({
  name: "TableConfig",
  components: { ChangeList },
  setup() {
    const { columns, dataSource, changeData } = useTableConfig();

    const dataSourceStr = ref(JSON.stringify(dataSource.value, null, 2));
    const addColumn = () => {
      const dataIndex = "column-" + uuid++;
      let column = {
        title: "demo列",
        dataIndex,
        key: dataIndex,
      };
      columns.value.push(column);
    };

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

    return {
      columns,
      dataSourceStr,
      addColumn,
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
  .add-wrapper {
    width: 100px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .iconjia {
      color: @mainThemeColor;
      font-size: 22px;
      margin: 0 10px;
    }
  }
}
</style>
