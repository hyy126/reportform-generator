<template>
  <section class="RightSide-wrapper">
    <div
      class="link-wrapper"
      @click="toLink"
      v-if="curSelectComponent && curSelectComponent.link"
    >
      <i class="iconfont iconlianjie"></i>
    </div>
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

    const toLink = () => {
      let opener = window.open(curSelectComponent.value?.link);
      opener!.opener = null;
    };

    return { curConfigComponent, curSelectComponent, toLink };
  },
});
</script>

<style lang="less" scoped>
.RightSide-wrapper {
  padding: 18px 6px;
  position: relative;
  .link-wrapper {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid @mainThemeColor;
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
    transition: all 0.3s;
    .flex-center();
    .iconlianjie {
      color: @mainThemeColor;
    }
    &:hover {
      background: @mainThemeColor;
      .iconlianjie {
        color: #fff;
      }
    }
  }
}
</style>
