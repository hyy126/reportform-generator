<template>
  <section class="Main-wrapper">
    {{ componentList }}
    <ComponentWrapper
      v-for="component in componentList"
      :key="'component-custom-' + component.id"
      :active="component.id === curSelectComponent.id"
      :componentObj="component"
    >
      <component :is="component.type" :componentProp="component.config">
        <template v-if="component.children">
          <a-col
            v-bind="child.formAttribute.grid"
            v-for="child in component.children"
            :key="'component-custom-form-' + child.id"
          >
            <FormElWrapper
              :active="child.id === curSelectComponent.id"
              :componentObj="child"
            >
              <CommonFormView
                :formAttribute="child.formAttribute"
                :labelCol="component.config.labelCol"
                :wrapperCol="component.config.wrapperCol"
              >
                <RenderFormItem
                  :type="child.type"
                  :componentProp="child.config"
                  :formAttribute="child.formAttribute"
                />
                <!-- <component
                  :is="child.type"
                  :componentProp="child.config"
                  :formAttribute="child.formAttribute"
                  :model="component.config.model"
                >
                </component> -->
              </CommonFormView>
            </FormElWrapper>
          </a-col>
        </template>
      </component>
    </ComponentWrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, watchEffect } from "vue";

import Table from "@/components/views/Table.tsx";
//import Table from "@/components/views/Table.vue";
// import Input from "@/components/views/Input.vue";
// import Select from "@/components/views/Select.vue";
// import DatePicker from "@/components/views/DatePicker.vue";
import FormContainer from "@/components/views/FormContainer.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import FormElWrapper from "@/components/FormElWrapper.vue";

import CommonFormView from "@/components/views/CommonFormView.vue";

import { useComponentManage, componentList } from "@/hooks/useComponentManage";

import Sortable, { SortableEvent } from "sortablejs";

import RenderFormItem from "@/components/renderFormItem";

let formSortList: Sortable[] = [];

export default defineComponent({
  name: "Main",
  components: {
    ComponentWrapper,
    FormElWrapper,
    CommonFormView,
    Table,
    FormContainer,
    // Input,
    // Select,
    // DatePicker,
    RenderFormItem,
  },
  setup() {
    const { componentList, curSelectComponent } = useComponentManage();

    onMounted(() => {
      const el = document.querySelector(".Main-wrapper")! as HTMLElement;
      new Sortable(el, {
        animation: 150,
        handle: ".component-drag",
        onSort: function (evt: SortableEvent) {
          const { newIndex, oldIndex } = evt;
          const move = componentList.value.splice(oldIndex!, 1)[0];
          componentList.value.splice(newIndex!, 0, move);
        },
      });
    });

    //监听 组件集合变化  创建sortable
    watchEffect(() => {
      const cl = componentList.value.length;
      nextTick(() => {
        formSortList.forEach((sort) => {
          sort.destroy();
        });
        formSortList = [];
        const formContainerList = document.querySelectorAll(
          ".formContainer > .ant-row"
        );
        //weakMap优化  只在新增或减少时创建或销毁
        formContainerList.forEach((el) => {
          let sort = new Sortable(el as HTMLElement, {
            group: "shared",
            animation: 150,
            onSort: function (evt: SortableEvent) {
              const { newIndex, oldIndex } = evt;
              console.log(newIndex, oldIndex);
            },
          });
          formSortList.push(sort);
        });
      });
    });
    //console.log((Input.render as Function)());
    return { componentList, curSelectComponent };
  },
});
</script>

<style lang="less" scoped>
.Main-wrapper {
  padding: 0 10px 10px 10px;
  height: calc(100% - 40px);
  overflow: auto;
  // .custom-component-wrapper {
  //   margin: 10px;
  //   border: 1px dashed #ccc;
  //   padding: 10px;
  // }
}
</style>
