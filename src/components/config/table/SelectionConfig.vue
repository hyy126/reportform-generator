<template>
  <section class="SelectionConfig-wrapper">
    <a-form
      :model="rowSelectionConfig"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item label="边框">
        <a-radio-group
          v-model:value="rowSelectionConfig.type"
          button-style="solid"
        >
          <a-radio-button value="checkbox">checkbox</a-radio-button>
          <a-radio-button value="radio">radio</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="固定列">
        <a-switch v-model:checked="rowSelectionConfig.fixed"
      /></a-form-item>
      <a-form-item label="置灰">
        <a-switch v-model:checked="rowSelectionConfig.disabled" /><a-input
          v-if="rowSelectionConfig.disabled"
          placeholder="record.status !== 1"
          v-model:value="rowSelectionConfig.disabledText"
        />
      </a-form-item>
      <a-form-item label="默认选中">
        <a-switch v-model:checked="rowSelectionConfig.defaultChecked" /><a-input
          v-if="rowSelectionConfig.defaultChecked"
          placeholder="record.status !== 1"
          v-model:value="rowSelectionConfig.defaultCheckedText"
      /></a-form-item>
    </a-form>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from "vue";
import { useRowSelection } from "@/hooks/useRowSelection";

export default defineComponent({
  name: "SelectionConfig",
  setup() {
    const { rowSelectionConfig } = useRowSelection();

    return { rowSelectionConfig };
  },
});
</script>

<style lang="less" scoped >
</style>