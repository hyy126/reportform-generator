<template>
  <section class="layout-wrapper">
    <section class="layout-header"><Header /></section>
    <section class="layout-main">
      <section class="layout-leftside"><LeftSide /></section>
      <section class="layout-content"><Main /></section>
      <section class="layout-rightside"><RightSide /></section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Main from "@/views/Main.vue";
import Header from "@/views/Header.vue";
import LeftSide from "@/views/LeftSide.vue";
import RightSide from "@/views/RightSide.vue";

export default defineComponent({
  name: "Table",
  components: { Main, Header, LeftSide, RightSide },
  setup() {
    return {};
  },
});
</script>

<style lang="less">
body,
html {
  height: 100%;
}
#app {
  height: 100%;
}
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
