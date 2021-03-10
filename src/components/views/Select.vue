<template>
  <a-select
    v-model:value="model[formAttribute.field]"
    :disabled="formAttribute.disabled"
    :allowClear="formAttribute.allowClear"
    :placeholder="formAttribute.placeholder"
  >
    <a-select-option
      v-for="item in componentProp.options"
      :key="item.value"
      :value="item.value"
      >{{ item.label }}</a-select-option
    >
  </a-select>
</template>

<script lang="ts">
import { IFormAttribute, ISelectComponent } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Select",
  props: {
    componentProp: Object as PropType<ISelectComponent>,
    model: Object,
    formAttribute: Object as PropType<IFormAttribute>,
  },
});
</script>