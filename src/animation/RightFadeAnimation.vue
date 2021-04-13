<template>
  <transition name="fade-right" mode="out-in" appear>
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RightFadeAnimation",
});
</script>
<style lang="less" scoped>
.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  transform: translate(20px, 0);
}

.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.35s;
}
</style>
