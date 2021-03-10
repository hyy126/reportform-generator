<template>
  <section class="RightSide-wrapper">
    <!-- <TableConfig /> -->
    <component
      :is="curConfigComponent"
      :componentProp="curSelectComponent ? curSelectComponent.config : {}"
      :formAttribute="
        curSelectComponent ? curSelectComponent.formAttribute : {}
      "
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

import TableConfig from "@/components/config/TableConfig.vue";
import InputConfig from "@/components/config/InputConfig.vue";
import SelectConfig from "@/components/config/SelectConfig.vue";
import DatePickerConfig from "@/components/config/DatePickerConfig.vue";

import FormContainerConfig from "@/components/config/FormContainerConfig.vue";

import { curSelectComponent } from "@/hooks/useComponentManage";

export default defineComponent({
  name: "RightSide",
  components: {
    TableConfig,
    InputConfig,
    SelectConfig,
    DatePickerConfig,
    FormContainerConfig,
  },
  setup() {
    const curConfigComponent = ref("");

    watchEffect(() => {
      curConfigComponent.value = curSelectComponent.value?.type + "Config";
    });

    return { curConfigComponent, curSelectComponent };
  },
});
</script>

<style lang="less" scoped>
.RightSide-wrapper {
  padding: 18px 6px;
}
</style>
