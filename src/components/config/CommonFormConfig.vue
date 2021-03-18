<template>
  <a-form-item label="标签">
    <a-input v-model:value="formAttribute.label" />
  </a-form-item>
  <a-form-item label="占位文本">
    <a-input v-model:value="formAttribute.placeholder" />
  </a-form-item>
  <a-form-item label="字段名">
    <a-input v-model:value="formAttribute.field" />
  </a-form-item>
  <a-form-item label="标签栅格">
    <a-switch
      v-model:checked="formAttribute.useFormCol"
      checked-children="default"
      un-checked-children="custom"
    />
    <a-tooltip color="blue">
      <template #title>
        <p>label与元素占比</p>
        <p>1.default: 默认使用form占比</p>
        <p>1.custom: 自定义占比</p>
      </template>
      <i class="iconfont iconV"></i>
    </a-tooltip>

    <a-slider
      v-show="!formAttribute.useFormCol"
      v-model:value="formAttribute.labelCol.span"
      :min="1"
      :max="23"
    />
  </a-form-item>
  <a-form-item label="grid">
    <a-slider v-model:value="formAttribute.grid.lg" :min="1" :max="24" />
  </a-form-item>
  <a-form-item label="能否清空">
    <a-switch v-model:checked="formAttribute.allowClear" />
  </a-form-item>
  <a-form-item label="是否必填">
    <a-switch v-model:checked="formAttribute.required" />
  </a-form-item>
  <a-form-item label="是否禁用">
    <a-switch v-model:checked="formAttribute.disabled" />
  </a-form-item>
</template>

<script lang="ts">
import { IFormAttribute, IGridCol, IInputComponent } from "@/typings";
import { defineComponent, PropType, watch, watchEffect } from "vue";

export default defineComponent({
  name: "SelectConfig",
  props: {
    componentProp: {
      type: Object as PropType<IInputComponent>,
      required: true,
    },
    formAttribute: {
      type: Object as PropType<IFormAttribute>,
      required: true,
    },
  },
  setup(prop) {
    watch(
      () => prop.formAttribute.labelCol,
      (value: IGridCol) => {
        prop.formAttribute.wrapperCol.span = 24 - value.span!;
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
.iconV {
  font-size: 26px;
  position: absolute;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: @mainThemeColor;
  }
}
p {
  margin-bottom: 0;
}
</style>