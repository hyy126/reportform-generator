<template>
  {{ componentProp }}
  <a-form
    :model="componentProp.model"
    :label-col="componentProp.labelCol"
    :wrapper-col="componentProp.wrapperCol"
    :layout="componentProp.layout"
    class="formContainer"
  >
    <a-row>
      <slot />
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { IFormComtainerComponent } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    componentProp: Object as PropType<IFormComtainerComponent>,
  },
  setup() {},
});
</script>

<style lang="less" scoped>
</style>
