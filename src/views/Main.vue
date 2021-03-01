<template>
  <section class="Main-wrapper">
    <ComponentWrapper
      v-for="component in componentList"
      :key="'component-custom-' + component.id"
      :active="component.id === curSelectComponent.id"
      :componentObj="component"
    >
      <component :is="component.type" :componentProp="component" />
    </ComponentWrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

import Table from "@/components/Table.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import { ComponentManage } from "@/hooks/ComponentManage";

export default defineComponent({
  name: "Main",
  components: { ComponentWrapper, Table },
  setup() {
    const { componentList, curSelectComponent } = ComponentManage();

    return { componentList, curSelectComponent };
  },
});
</script>

<style lang="less" scoped>
.Main-wrapper {
  padding: 10px;
  height: 100%;
  overflow: auto;
  // .custom-component-wrapper {
  //   margin: 10px;
  //   border: 1px dashed #ccc;
  //   padding: 10px;
  // }
}
</style>
