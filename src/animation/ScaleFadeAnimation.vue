<template>
  <transition name="fade-scale-min" appear>
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScaleFadeAnimation",
});
</script>
<style lang="less" scoped>
.fade-scale-min-enter-from,
.fade-scale-min-leave-to {
  opacity: 0;
  transform: scale(0);
}

.fade-scale-min-enter-active,
.fade-scale-min-leave-active {
  transition: all 0.5s;
}
</style>
