<template>
  <a-form
    :model="componentProp"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 15 }"
  >
    <a-form-item label="布局方式">
      <a-radio-group v-model:value="componentProp.layout">
        <a-radio-button value="horizontal">水平</a-radio-button>
        <a-radio-button value="vertical">垂直</a-radio-button>
        <a-radio-button value="inline">内联</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="标签栅格">
      <a-slider
        v-model:value="componentProp.labelCol.span"
        :tooltipVisible="true"
        :min="1"
        :max="23"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { IFormComtainerComponent, IGridCol } from "@/typings";
import { defineComponent, PropType, watch } from "vue";

export default defineComponent({
  name: "InputConfig",
  props: {
    componentProp: {
      type: Object as PropType<IFormComtainerComponent>,
      required: true,
    },
  },
  setup(prop) {
    watch(
      () => prop.componentProp.labelCol,
      (value: IGridCol) => {
        prop.componentProp.wrapperCol.span = 24 - value.span!;
      },
      {
        deep: true,
      }
    );
    return {};
  },
});
</script>

<style lang="less" scoped>
// .InputConfig-wrapper {
// }
</style>
