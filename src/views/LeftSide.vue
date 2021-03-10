<template>
  <section class="LeftSide-wrapper">
    <section
      class="component-module-wrapper"
      v-for="(item, index) in componentList"
      :key="'ComponentList-Module-' + index"
    >
      <span> {{ item.title }}</span>
      <ul class="component-list">
        <li
          v-for="(componentObj, index2) in item.list"
          :key="'componentObj-' + item.key + index2"
          @click="selectComponent(componentObj)"
        >
          <i :class="['iconfont', componentObj.icon]"></i>
          {{ componentObj.name }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { componentList } from "@/config";

import { useComponentManage } from "@/hooks/useComponentManage";
import { IComponent } from "@/typings";

export default defineComponent({
  name: "LeftSide",
  setup() {
    const { addComponent, replaceComponentByModel } = useComponentManage();

    const selectComponent = (componnetObj: any) => {
      const { type, list } = componnetObj;
      if (type) {
        addComponent(type);
      } else if (list) {
        replaceComponentByModel(list);
      }
    };

    return { componentList, selectComponent };
  },
});
</script>

<style lang="less" scoped>
.LeftSide-wrapper {
  padding: 20px 10px;
  height: inherit;
  overflow: auto;
  .component-list {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 108px;
      height: 32px;
      background: #f4f6fc;
      display: flex;
      align-items: center;
      padding-left: 10px;
      font-size: 12px;
      cursor: move;
      box-sizing: border-box;
      border-radius: 6px;
      margin-bottom: 10px;
      i {
        margin-right: 10px;
      }
      &:hover {
        border: 1px dashed blue;
      }
    }
  }
}
</style>
