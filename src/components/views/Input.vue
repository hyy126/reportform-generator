<template>
  <!-- <a-col :span="componentProp.grid"> -->
  <a-form-item
    :label="componentProp.label"
    :required="componentProp.required"
    :label-col="componentProp.labelCol || labelCol"
    :wrapper-col="componentProp.wrapperCol || wrapperCol"
  >
    <a-input
      v-model:value="model[componentProp.field]"
      :placeholder="componentProp.placeholder"
      :allowClear="componentProp.allowClear"
      :disabled="componentProp.disabled"
    />
  </a-form-item>
  <!-- </a-col> -->
</template>

<script lang="ts">
import { IGridCol, IInputComponent } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    componentProp: Object as PropType<IInputComponent>,
    model: Object,
    labelCol: Object as PropType<IGridCol>,
    wrapperCol: Object as PropType<IGridCol>,
  },
  setup() {},
});
</script>

<style lang="less" scoped>
</style>
