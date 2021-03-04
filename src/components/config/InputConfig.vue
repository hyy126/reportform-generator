<template>
  <a-form
    :model="componentProp"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 15 }"
  >
    <a-form-item label="标签">
      <a-input v-model:value="componentProp.label" />
    </a-form-item>
    <a-form-item label="占位文本">
      <a-input v-model:value="componentProp.placeholder" />
    </a-form-item>
    <a-form-item label="字段名">
      <a-input v-model:value="componentProp.field" />
    </a-form-item>
    <a-form-item label="默认值">
      <a-input v-model:value="componentProp.defaultValue" />
    </a-form-item>
    <a-form-item label="标签栅格">
      <a-slider
        v-model:value="componentProp.labelCol.span"
        :min="1"
        :max="23"
      />
    </a-form-item>
    <a-form-item label="能否清空">
      <a-switch v-model:checked="componentProp.allowClear" />
    </a-form-item>
    <a-form-item label="输入统计">
      <a-switch v-model:checked="componentProp.showCount" />
    </a-form-item>
    <a-form-item label="是否必填">
      <a-switch v-model:checked="componentProp.required" />
    </a-form-item>
    <a-form-item label="是否禁用">
      <a-switch v-model:checked="componentProp.disabled" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { IInputComponent } from "@/typings";
import { defineComponent, PropType, watch, watchEffect } from "vue";

export default defineComponent({
  name: "InputConfig",
  props: {
    componentProp: {
      type: Object as PropType<IInputComponent>,
      required: true,
    },
  },
  setup(prop) {
    watch(
      () => {
        prop.componentProp.labelCol;
      },
      (value: any) => {
        console.log(value);
        prop.componentProp.wrapperCol.span = 24 - value;
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
