<template>
  <a-date-picker
    v-model:value="formAttribute.defaultValue"
    :format="componentProp.format"
    :valueFormat="componentProp.valueFormat"
    :placeholder="formAttribute.placeholder"
    :allowClear="formAttribute.allowClear"
    :disabled="formAttribute.disabled"
  />
</template>

<script lang="ts">
import { IDatePickerComponent, IFormAttribute } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DatePicker",
  props: {
    componentProp: Object as PropType<IDatePickerComponent>,
    model: Object,
    formAttribute: Object as PropType<IFormAttribute>,
  },
  setup() {},
});
</script>