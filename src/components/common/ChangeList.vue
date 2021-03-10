<template>
  <section id="col-edit-id">
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
  <div class="add-wrapper" @click="addColumn">
    <i class="iconfont iconjia"></i><span>添加</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";

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

    onMounted(() => {
      const el = document.getElementById("col-edit-id")!;
      const sortable = new Sortable(el, {
        handle: ".iconpaixu",
        /* SortableEvent */
        onSort: function (evt: SortableEvent) {
          const { newIndex, oldIndex } = evt;
          const moveColumn = prop.list.splice(oldIndex!, 1)[0];
          prop.list.splice(newIndex!, 0, moveColumn);
        },
      });
    });

    return {
      addColumn,
      removeColumn,
    };
  },
});
</script>

<style lang="less" scoped>
#col-edit-id:deep(input) {
  margin: 0 5px;
}

#col-edit-id {
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

.add-wrapper {
  width: 100px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .iconjia {
    color: @mainThemeColor;
    font-size: 22px;
    margin: 0 10px;
  }
}
</style>
