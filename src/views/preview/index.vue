<template>
  <section class="layout-content"><Main /></section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Main from "@/views/preview/Main.vue";

export default defineComponent({
  name: "Preview",
  components: { Main },
});
</script>

<style lang="less" scoped>
</style>
