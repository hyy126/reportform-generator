<template>
  <section class="TableColumnConfig-wrapper">
    <a-table
      :columns="columns"
      :data-source="data"
      size="small"
      :row-key="(record) => record.key"
      :scroll="{ x: 1200 }"
    >
      <template #title="{ record }">
        <a-input
          style="width: 120px"
          v-if="record"
          v-model:value="record.title"
          placeholder="例:姓名"
        />
      </template>
      <template #dataIndex="{ record }">
        <a-input
          v-if="record"
          v-model:value="record.dataIndex"
          placeholder="例:name"
        />
      </template>
      <template #sorter="{ record }">
        <a-switch v-model:checked="record.sorterConfig.sort" />
        <a-button
          style="margin-left: 10px"
          v-if="record.sorterConfig.sort"
          size="small"
          type="primary"
          @click="configSort(record)"
          >配置</a-button
        >
      </template>
      <template #ellipsis="{ record }">
        <a-switch v-model:checked="record.ellipsis" />
      </template>
      <template #width="{ record }">
        <a-input-number
          placeholder="例:200"
          v-model:value="record.width"
          :min="0"
          :max="1000"
        />
      </template>
      <!-- <template #colSpan="{ record }">
      <a-input-number v-model:value="record.colSpan" :min="0" :max="10" />
    </template> -->
      <template #align="{ record }">
        <a-select v-model:value="record.align">
          <a-select-option value="left">left</a-select-option>
          <a-select-option value="center">center</a-select-option>
          <a-select-option value="right">right</a-select-option>
        </a-select>
      </template>
      <template #fixed="{ record }">
        <a-radio-group v-model:value="record.fixed" button-style="solid">
          <a-radio-button :value="false">false</a-radio-button>
          <a-radio-button value="left">left</a-radio-button>
          <a-radio-button value="right">right</a-radio-button>
        </a-radio-group>
      </template>
      <template #operation="{ record }">
        <a-tooltip>
          <template #title>
            <p>表头分组</p>
          </template>
          <a @click="addChild(record)" style="margin-right: 20px">子列</a>
        </a-tooltip>

        <a-popconfirm
          title="确定删除该列吗?"
          @confirm="onDelete(record.dataIndex)"
        >
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </section>
  <a-modal
    v-model:visible="showSortConfig"
    width="600px"
    centered
    title="排序配置"
    :footer="null"
  >
    <SortConfig :column="curEditRecord" />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useTableConfig } from "@/hooks/useTableConfig";
import { ITableColumn } from "@/typings";
import { deepFind } from "@/utils";
import SortConfig from "./SortConfig.vue";

const columns = [
  {
    title: "列名",
    width: 250,
    dataIndex: "title",
    fixed: "left",
    slots: { customRender: "title" },
  },
  {
    title: "列值",
    dataIndex: "dataIndex",
    slots: { customRender: "dataIndex" },
  },
  {
    title: "排序",
    dataIndex: "sorter",
    slots: { customRender: "sorter" },
  },
  {
    title: "超出省略",
    dataIndex: "ellipsis",
    slots: { customRender: "ellipsis" },
  },
  {
    title: "宽度",
    dataIndex: "width",
    slots: { customRender: "width" },
  },
  // {
  //   title: "合并单元格",
  //   dataIndex: "colSpan",
  //   slots: { customRender: "colSpan" },
  // },
  {
    title: "对齐方式",
    dataIndex: "align",
    slots: { customRender: "align" },
  },
  {
    title: "固定",
    dataIndex: "fixed",
    width: 220,
    slots: { customRender: "fixed" },
  },
  {
    title: "操作",
    fixed: "right",
    width: 110,
    slots: { customRender: "operation" },
  },
];

export default defineComponent({
  name: "TableColumnConfig2",
  components: { SortConfig },
  setup() {
    const {
      columns: data,
      createColumn,
      addColumn,
      normalizeColumnSort,
    } = useTableConfig();

    const onDelete = (dataIndex: string) => {
      //data.value.splice(index, 1);
      let { parent, matchIndex } = deepFind<ITableColumn>(data.value, {
        matchValue: dataIndex,
        prop: "dataIndex",
        cleanChildProp: true,
      });

      parent.splice(matchIndex, 1);
    };

    const addChild = (record: ITableColumn) => {
      const child = createColumn();
      record.children = record.children ? [...record.children, child] : [child];
    };

    const showSortConfig = ref(false);
    const curEditRecord = ref<ITableColumn>();

    const configSort = (record: ITableColumn) => {
      showSortConfig.value = true;
      curEditRecord.value = record;
    };

    watch(
      data,
      () => {
        normalizeColumnSort(data.value);
      },
      {
        deep: true,
      }
    );

    return {
      data,
      columns,
      addColumn,
      onDelete,
      addChild,
      configSort,
      showSortConfig,
      curEditRecord,
    };
  },
});
</script>

<style lang="less" scoped >
// .TableColumnConfig-wrapper:deep(.ant-table-thead > tr > th),
// .TableColumnConfig-wrapper:deep(.ant-table-tbody > tr > td) {
//   padding: 10px !important;
// }

.TableColumnConfig-wrapper:deep(.ant-table-fixed-right
    .ant-table-tbody
    > tr
    > td) {
  padding: 13px !important;
}
.TableColumnConfig-wrapper:deep(.ant-table-body::-webkit-scrollbar) {
  width: 10px;
  height: 10px;
}
</style>