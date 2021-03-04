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
  </a-form>
</template>

<script lang="ts">
import { IInputComponent } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "InputConfig",
  props: {
    componentProp: Object as PropType<IInputComponent>,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
// .InputConfig-wrapper {
// }
</style>
