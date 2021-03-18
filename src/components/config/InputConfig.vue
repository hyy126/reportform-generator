<template>
  <a-form
    :model="componentProp"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 15 }"
  >
    <CommonFormConfig
      :componentProp="componentProp"
      :formAttribute="formAttribute"
    />
    <a-form-item label="默认值">
      <a-input v-model:value="formAttribute.defaultValue" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { IFormAttribute, IInputComponent } from "@/typings";
import { defineComponent, PropType, ref } from "vue";

import CommonFormConfig from "./CommonFormConfig.vue";

export default defineComponent({
  name: "InputConfig",
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
  components: { CommonFormConfig },
});
</script>