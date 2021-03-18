<template>
  <section class="modal-column-wrapper">
    <section class="header-wrapper">
      <span :style="{ width: widthConfig.input }">列名</span>
      <span :style="{ width: widthConfig.input }">列值</span>
      <span :style="{ width: widthConfig.switch }">排序</span>
      <span :style="{ width: widthConfig.switch }">超出省略</span>
      <span :style="{ width: widthConfig.inputNumber }">宽度(自定义)</span>
      <span :style="{ width: widthConfig.inputNumber }">合并单元格</span>
      <span :style="{ width: widthConfig.align }">对齐方式</span>
      <span :style="{ width: widthConfig.radioButton }">固定</span>
      <span :style="{ width: widthConfig.button }">表头分组</span>
    </section>
    <ChangeList :list="columns" @addColumn="addColumn">
      <template #default="scope">
        <a-input
          :style="{ width: widthConfig.input }"
          v-model:value="scope.item.title"
          placeholder="例:姓名"
        />
        <a-input
          :style="{ width: widthConfig.input }"
          v-model:value="scope.item.dataIndex"
          placeholder="例:name"
        />
        <a-switch
          :style="{ width: widthConfig.switch }"
          v-model:checked="scope.item.sorter"
          checked-children="是"
          un-checked-children="否"
        />
        <a-switch
          :style="{ width: widthConfig.switch }"
          v-model:checked="scope.item.ellipsis"
          checked-children="是"
          un-checked-children="否"
        />
        <a-input-number
          placeholder="例:200"
          v-model:value="scope.item.width"
          :min="0"
          :max="1000"
        />
        <a-input-number v-model:value="scope.item.colSpan" :min="0" :max="10" />
        <a-select
          :style="{ width: widthConfig.align }"
          v-model:value="scope.item.align"
        >
          <a-select-option value="left">left</a-select-option>
          <a-select-option value="center">center</a-select-option>
          <a-select-option value="right">right</a-select-option>
        </a-select>
        <a-radio-group
          :style="{ width: widthConfig.radioButton }"
          v-model:value="scope.item.fixed"
          button-style="solid"
        >
          <a-radio-button :value="false">false</a-radio-button>
          <a-radio-button value="left">left</a-radio-button>
          <a-radio-button value="right">right</a-radio-button>
        </a-radio-group>
        <a-button
          :style="{ width: widthConfig.button }"
          :type="scope.item.children ? 'primary' : 'default'"
          @click="openColChildren(scope.item.children)"
          >children</a-button
        >
      </template>
    </ChangeList>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ChangeList from "@/components/common/ChangeList.vue";
import { useTableConfig } from "@/hooks/useTableConfig";
import { ITableColumn } from "@/typings";

const widthConfig = {
  input: "120px",
  switch: "70px",
  inputNumber: "88px",
  align: "90px",
  radioButton: "172px",
  button: "82px",
};

export default defineComponent({
  name: "TableColumnConfig",
  components: { ChangeList },
  setup() {
    const { columns, addColumn } = useTableConfig();

    return {
      columns,
      addColumn,
      widthConfig,
    };
  },
});
</script>

<style lang="less" scoped>
.modal-column-wrapper {
  width: 100%;
  overflow: auto;
}
.header-wrapper {
  display: inline-flex;
  padding: 0 20px 0 30px;
  span {
    text-align: center;
    display: inline-block;
    margin: 0 5px;
  }
}
</style>
