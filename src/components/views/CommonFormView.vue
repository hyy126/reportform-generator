<template>
  <a-form-item
    :label="formAttribute.label"
    :required="formAttribute.required"
    :label-col="formAttribute.useFormCol ? labelCol : formAttribute.labelCol"
    :wrapper-col="
      formAttribute.useFormCol ? wrapperCol : formAttribute.wrapperCol
    "
  >
    <slot />
  </a-form-item>
</template>

<script lang="ts">
import { IFormAttribute, IGridCol } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CommonFormView",
  props: {
    labelCol: Object as PropType<IGridCol>,
    wrapperCol: Object as PropType<IGridCol>,
    formAttribute: Object as PropType<IFormAttribute>,
  },
});
</script>