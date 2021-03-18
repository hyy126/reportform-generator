<template>
  {{ data }}
  <a-table
    :columns="columns"
    :data-source="data"
    :row-key="(record) => record.key"
    :scroll="{ x: 1500 }"
  >
    <template #title="{ record }">
      <a-input
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
      <a-switch
        v-model:checked="record.sorter"
        checked-children="是"
        un-checked-children="否"
      />
    </template>
    <template #ellipsis="{ record }">
      <a-switch
        v-model:checked="record.ellipsis"
        checked-children="是"
        un-checked-children="否"
      />
    </template>
    <template #width="{ record }">
      <a-input-number
        placeholder="例:200"
        v-model:value="record.width"
        :min="0"
        :max="1000"
      />
    </template>
    <template #colSpan="{ record }">
      <a-input-number v-model:value="record.colSpan" :min="0" :max="10" />
    </template>
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
    <template #operation="{ index }">
      <a @click="addChild(index)">子列</a>
      <a-popconfirm title="确定删除该列吗?" @confirm="onDelete(index)">
        <a>删除</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useTableConfig } from "@/hooks/useTableConfig";

const columns = [
  {
    title: "列名",
    width: 180,
    dataIndex: "title",
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
  {
    title: "合并单元格",
    dataIndex: "colSpan",
    slots: { customRender: "colSpan" },
  },
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
    title: "表头分组",
    dataIndex: "children",
  },
  {
    title: "Action",
    fixed: "right",
    width: 120,
    slots: { customRender: "operation" },
  },
];

export default defineComponent({
  name: "TableColumnConfig2",
  setup() {
    const { columns: data, createColumn, addColumn } = useTableConfig();

    const onDelete = (index: number) => {
      data.value.splice(index, 1);
    };

    const addChild = (index: number) => {
      const child = createColumn();
      let cur = data.value[index];
      console.log(cur);
      cur.children?.push(child);
      //cur.children = cur.children ? [...cur.children, child] : [child];
    };

    return {
      data,
      columns,
      addColumn,
      onDelete,
      addChild,
    };
  },
});
</script>

