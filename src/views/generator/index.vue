<template>
  <section class="layout-wrapper">
    <section class="layout-header"><Header /></section>
    <section class="layout-main">
      <section class="layout-leftside"><LeftSide /></section>
      <section class="layout-content">
        <Operation />
        <Main />
      </section>
      <section class="layout-rightside"><RightSide /></section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Main from "@/views/generator/Main.vue";
import Header from "@/views/generator/Header.vue";
import LeftSide from "@/views/generator/LeftSide.vue";
import RightSide from "@/views/generator/RightSide.vue";
import Operation from "@/components/Operation.vue";

export default defineComponent({
  name: "ReportformGenerator",
  components: { Main, Header, LeftSide, RightSide, Operation },
});
</script>

<style lang="less" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .layout-header {
    height: 50px;
    width: 100%;
  }
  .layout-main {
    display: flex;
    width: 100%;
    height: calc(100% - 50px);
    .layout-leftside {
      width: 250px;
      height: 100%;
    }
    .layout-content {
      flex: 1;
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
    .layout-rightside {
      width: 300px;
      height: 100%;
    }
  }
}
</style>
