<template>
  <section ref="colEditEl" class="col-edit-container">
    <div
      class="col-edit-wrapper"
      v-for="(item, index) in list"
      :key="'col-edit-wrapper-' + item.key"
    >
      <i class="iconfont iconpaixu"></i>
      <slot :item="item"></slot>
      <i class="iconfont iconjian" @click="removeColumn(index)"></i>
    </div>
  </section>
  <div class="operation-wrapper">
    <div class="add-wrapper" @click="addColumn">
      <i class="iconfont iconjia"></i><span>添加</span>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

import { useTableConfig } from "@/hooks/useTableConfig";

import Sortable, { SortableEvent } from "sortablejs";

let uuid = 3;

export default defineComponent({
  name: "ChangeList",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ["addColumn"],
  setup(prop, ctx) {
    const addColumn = () => {
      ctx.emit("addColumn");
    };

    const removeColumn = (index: number) => {
      prop.list.splice(index, 1);
    };

    let colEditEl = ref<HTMLElement>();
    onMounted(() => {
      const sortable = new Sortable(colEditEl.value!, {
        handle: ".iconpaixu",
        /* SortableEvent */
        onSort: function (evt: SortableEvent) {
          const { newIndex, oldIndex } = evt;
          const moveColumn = prop.list.splice(oldIndex!, 1)[0];
          prop.list.splice(newIndex!, 0, moveColumn);
        },
      });
    });

    return { colEditEl, addColumn, removeColumn };
  },
});
</script>


<style lang="less" >
.col-edit-wrapper > * {
  margin: 0 5px !important;
}
</style>

<style lang="less" scoped>
.col-edit-container {
  display: grid;
  .col-edit-wrapper {
    display: flex;
    align-items: center;
    height: 32px;
    margin: 5px 0;

    .iconpaixu {
      font-size: 20px;
      cursor: move;
      &:hover {
        color: @mainThemeColor;
      }
    }
    .iconjian {
      color: red;
      font-size: 24px;
      cursor: pointer;
    }
  }
}

.operation-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  .add-wrapper {
    cursor: pointer;
    .flex-center();
    .iconjia {
      color: @mainThemeColor;
      font-size: 22px;
      margin: 0 10px;
    }
  }
}
</style>
