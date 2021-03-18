<template>
  <a-form
    :model="componentProp.model"
    :label-col="componentProp.labelCol"
    :wrapper-col="componentProp.wrapperCol"
    :layout="componentProp.layout"
    class="formContainer"
  >
    <a-row>
      <a-col
        v-bind="child.formAttribute.grid"
        v-for="child in component.children"
        :key="'component-custom-form-' + child.id"
      >
        <a-form-item
          :label="formAttribute.label"
          :required="formAttribute.required"
          :label-col="
            formAttribute.useFormCol ? labelCol : formAttribute.labelCol
          "
          :wrapper-col="
            formAttribute.useFormCol ? wrapperCol : formAttribute.wrapperCol
          "
        >
          <component
            :is="child.type"
            :componentProp="child.config"
            :formAttribute="child.formAttribute"
            :model="component.config.model"
          >
          </component>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Form",
  setup() {
    const reactiveData = reactive({
      dataSource: [],
      columns: [],
    });

    return {
      ...toRefs(reactiveData),
    };
  },
});
</script>
