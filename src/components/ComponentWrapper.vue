<template>
{{componentObj}}
  <section
    class="custom-component-wrapper"
    :class="active ? 'active' : ''"
    @click="selectComponent(componentObj)"
  >
    <div class="component-drag" v-show="active">
      <i class="iconfont iconDrag"></i>
    </div>
    <div
      class="component-delete"
      v-show="active"
      @click="deleteComponent(componentObj)"
    >
      <i class="iconfont icondelete"></i>
    </div>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ComponentManage } from "@/hooks/ComponentManage";

export default defineComponent({
  name: "ComponentWrapper",
  props: {
    componentObj: Object,
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { selectComponent, deleteComponent } = ComponentManage();

    return { selectComponent, deleteComponent };
  },
});
</script>

<style lang="less" scoped>
.custom-component-wrapper {
  position: relative;
  margin: 10px;
  border: 1px dashed #ccc;
  padding: 10px;
  .component-drag {
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    .flex-center();
    background: @mainThemeColor;
    z-index: 1;
    color: #fff;
    cursor: move;
    i {
      font-size: 18px;
    }
  }
  .component-delete {
    position: absolute;
    right: 10%;
    top: -10px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid @redColorShallow;
    .flex-center();
    z-index: 1;
    color: @redColorShallow;
    cursor: pointer;
    background: #fff;
    i {
      font-size: 14px;
    }
    &:hover {
      color: #fff;
      background: @redColorShallow;
    }
  }
  &.active {
    border-color: @mainThemeColor;
  }
}
</style>
