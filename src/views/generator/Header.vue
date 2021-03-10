<template>
  <section class="Header-wrapper">
    <div class="title">Reportform-Generator</div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.Header-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  background-image: linear-gradient(90deg, #c973ff, #aebaf8);
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    opacity: 0.9;
    margin-left: 30px;
  }
}
</style>
