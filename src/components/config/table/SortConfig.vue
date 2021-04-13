<template>
  {{ column.sorter }}
  <section class="SortConfig-wrapper">
    <a-form
      :model="column"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 17 }"
    >
      <a-form-item label="排序方式">
        <a-radio-group
          v-model:value="column.sorterConfig.sortType"
          button-style="solid"
        >
          <a-radio-button value="server">服务端</a-radio-button>
          <a-radio-button value="local">本地</a-radio-button>
        </a-radio-group>
        <a-textarea
          v-if="column.sorterConfig.sortType === 'local'"
          v-model:value="column.sorterConfig.sortFunStr"
          placeholder="本地排序方法"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="支持的排序方式">
        <a-checkbox-group
          v-model:value="column.sortDirections"
          :options="sortDirectionOptions"
        />
      </a-form-item>
    </a-form>
  </section>
</template>
<script lang="ts">
import { ITableColumn } from "@/typings";
import { defineComponent, PropType, watchEffect } from "vue";

const sortDirectionOptions = ["ascend", "descend"];

export default defineComponent({
  name: "SortConfig",
  props: {
    column: {
      type: Object as PropType<ITableColumn>,
      required: true,
    },
  },
  setup(prop) {
    watchEffect(() => {
      if (prop.column.sorterConfig.sortType === "local") {
        try {
          prop.column.sorter = eval(`${prop.column.sorterConfig.sortFunStr}`);
        } catch (error) {}
      } else {
        prop.column.sorter = true;
      }
    });

    return {
      sortDirectionOptions,
    };
  },
});
</script>

<style lang="less" scoped >
</style>