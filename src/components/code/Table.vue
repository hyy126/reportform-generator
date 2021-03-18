<template>
  <a-table
    :dataSource="dataSource"
    :columns="columns"
    :rowKey="(record) => record.id"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Table",
  setup() {
    const reactiveData = reactive({
      dataSource: [],
      columns: [],
    });

    return {
      ...toRefs(reactiveData),
    };
  },
});
</script>