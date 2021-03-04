<template>
  <section
    class="FormContainer-component-wrapper"
    :class="active ? 'active' : ''"
    @click.stop="selectComponent(componentObj)"
  >
    <div class="component-delete" @click.stop="deleteComponent(componentObj)">
      <i class="iconfont icondelete"></i>
    </div>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useComponentManage } from "@/hooks/useComponentManage";

export default defineComponent({
  name: "FormElWrapper",
  props: {
    componentObj: Object,
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { selectComponent, deleteComponent } = useComponentManage();

    return { selectComponent, deleteComponent };
  },
});
</script>

<style lang="less" scoped>
.FormContainer-component-wrapper {
  position: relative;
  padding: 10px 5px;
  border-radius: 6px;
  cursor: move;
  width: 100%;
  .component-delete {
    display: none;
    position: absolute;
    right: 10%;
    top: -10px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    text-align: center;
    line-height: 22px;
    border: 1px solid @redColorShallow;
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
  &.active,
  &:hover {
    background: #f6f7ff;
    .component-delete {
      display: inline;
    }
  }
}
</style>
