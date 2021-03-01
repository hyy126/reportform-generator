<template>
  <section class="TableConfig-wrapper">
    <a-divider>列属性</a-divider>
    <section id="col-edit-id">
      <div
        class="col-edit-wrapper"
        v-for="(item, index) in columns"
        :key="'col-edit-wrapper-' + item.key"
      >
        <i class="iconfont iconpaixu"></i>
        <a-input v-model:value="item.title" placeholder="列名" />
        <a-input v-model:value="item.dataIndex" placeholder="列值" />
        <i class="iconfont iconjian" @click="removeColumn(index)"></i>
      </div>
    </section>

    <div class="add-wrapper" @click="addColumn">
      <i class="iconfont iconjia"></i><span>添加列</span>
    </div>
    <a-divider>测试数据</a-divider>
    <a-textarea
      v-model:value="dataSourceStr"
      auto-size
      placeholder="测试数据"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

import { useConfig } from "@/hooks/useConfig";

import Sortable, { SortableEvent } from "sortablejs";

let uuid = 0;

export default defineComponent({
  name: "TableConfig",
  setup() {
    const { columns, dataSource, changeData } = useConfig();

    const dataSourceStr = ref(JSON.stringify(dataSource.value, null, 2));
    const addColumn = () => {
      const dataIndex = "column-" + uuid++;
      let column = {
        title: "demo列",
        dataIndex,
      };
      columns.value.push(column);
      //dataSource.value[0][dataIndex] = dataIndex;
    };

    const removeColumn = (index: number) => {
      columns.value.splice(index, 1);
    };

    onMounted(() => {
      const el = document.getElementById("col-edit-id")!;
      const sortable = new Sortable(el, {
        handle: ".iconpaixu",
        /* SortableEvent */
        onSort: function (evt: SortableEvent) {
          const { newIndex, oldIndex } = evt;
          const moveColumn = columns.value.splice(oldIndex!, 1)[0];
          columns.value.splice(newIndex!, 0, moveColumn);
        },
      });
    });

    watch(dataSource, () => {
      dataSourceStr.value = JSON.stringify(dataSource.value, null, 2);
    });

    watch(dataSourceStr, () => {
      try {
        changeData("dataSource", JSON.parse(dataSourceStr.value || "[]"));
      } catch (error) {
        console.log(dataSourceStr.value);
      }
    });

    return {
      columns,
      dataSourceStr,
      addColumn,
      removeColumn,
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
