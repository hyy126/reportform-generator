<template>
  <section class="Main-wrapper">
    <component
      v-for="component in componentList"
      :key="'component-custom-' + component.id"
      :is="component.type"
      :componentProp="component.config"
    >
      <template v-if="component.children">
        <a-col
          :xs="child.formAttribute.grid.xs"
          :sm="child.formAttribute.grid.sm"
          :md="child.formAttribute.grid.md"
          :lg="child.formAttribute.grid.lg"
          :xl="child.formAttribute.grid.xl"
          :xxl="child.formAttribute.grid.xxl"
          v-for="child in component.children"
          :key="'component-custom-form-' + child.id"
        >
          <CommonFormView
            :formAttribute="child.formAttribute"
            :labelCol="component.config.labelCol"
            :wrapperCol="component.config.wrapperCol"
          >
            <component
              :is="child.type"
              :componentProp="child.config"
              :formAttribute="child.formAttribute"
              :model="component.config.model"
            >
            </component>
          </CommonFormView>
        </a-col>
      </template>
    </component>
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, watchEffect } from "vue";

import Table from "@/components/views/Table.vue";
import Input from "@/components/views/Input.vue";
import Select from "@/components/views/Select.vue";
import DatePicker from "@/components/views/DatePicker.vue";
import FormContainer from "@/components/views/FormContainer.vue";

import CommonFormView from "@/components/views/CommonFormView.vue";

import { useComponentManage, componentList } from "@/hooks/useComponentManage";

import Sortable, { SortableEvent } from "sortablejs";

let formSortList: Sortable[] = [];

export default defineComponent({
  name: "PreviewMain",
  components: {
    CommonFormView,
    Table,
    FormContainer,
    Input,
    Select,
    DatePicker,
  },
  setup() {
    const { componentList } = useComponentManage();

    return { componentList };
  },
});
</script>

<style lang="less" scoped>
.Main-wrapper {
  padding: 10px;
  height: 100%;
  overflow: auto;
}
</style>
