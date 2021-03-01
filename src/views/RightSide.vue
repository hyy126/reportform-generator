<template>
  <section class="RightSide-wrapper">
    <TableConfig />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TableConfig from "@/components/TableConfig.vue";

export default defineComponent({
  name: "RightSide",
  components: { TableConfig },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.RightSide-wrapper {
  padding: 12px;
}
</style>
