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
    <a-form-item label="格式">
      <a-input v-model:value="componentProp.format" />
    </a-form-item>
    <!-- <a-form-item label="默认值">
      <a-input v-model:value="componentProp.defaultValue" />
    </a-form-item> -->
  </a-form>
</template>

<script lang="ts">
import { IDatePickerComponent, IFormAttribute } from "@/typings";
import { defineComponent, PropType } from "vue";

import CommonFormConfig from "./CommonFormConfig.vue";

export default defineComponent({
  name: "DatePickerConfig",
  props: {
    componentProp: {
      type: Object as PropType<IDatePickerComponent>,
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