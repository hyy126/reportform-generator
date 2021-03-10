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
      <a-input v-model:value="componentProp.defaultValue" />
    </a-form-item>

    <a-divider>值选项</a-divider>

    <ChangeList :list="componentProp.options" @addColumn="addColumn">
      <template #default="scope">
        <a-input v-model:value="scope.item.label" placeholder="label" />
        <a-input v-model:value="scope.item.value" placeholder="value" />
      </template>
    </ChangeList>
  </a-form>
</template>

<script lang="ts">
import { IFormAttribute, ISelectComponent } from "@/typings";
import { defineComponent, PropType } from "vue";

import CommonFormConfig from "./CommonFormConfig.vue";

import ChangeList from "@/components/common/ChangeList.vue";

let uuid = 3;

export default defineComponent({
  name: "SelectConfig",
  props: {
    componentProp: {
      type: Object as PropType<ISelectComponent>,
      required: true,
    },
    formAttribute: {
      type: Object as PropType<IFormAttribute>,
      required: true,
    },
  },
  components: { CommonFormConfig, ChangeList },
  setup(prop) {
    const addColumn = () => {
      const value = "select-value-" + ++uuid;
      let column = {
        label: "选项" + uuid,
        value,
        key: value,
      };
      prop.componentProp.options.push(column);
    };

    return { addColumn };
  },
});
</script>

<style lang="less" scoped>
// .InputConfig-wrapper {
// }
</style>
