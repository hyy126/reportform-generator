<template>
  <transition name="fade-left" mode="out-in" appear>
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LeftFadeAnimation",
});
</script>
<style lang="less" scoped>
.fade-left-enter-from,
.fade-left-leave-to {
  opacity: 0;
  transform: translate(-50%, 0);
}

.fade-left-enter-active,
.fade-left-leave-active {
  transition: all 0.7s;
}
</style>
