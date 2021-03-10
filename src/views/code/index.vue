<template>
  <Monaco :value="value" :language="language" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Monaco from "@/components/common/Monaco.vue";

export default defineComponent({
  name: "Operation",
  components: { Monaco },
  setup() {
    const value = `import { defineComponent, nextTick, onMounted, watchEffect } from "vue";

import Table from "@/components/views/Table.vue";
import Input from "@/components/views/Input.vue";
import Select from "@/components/views/Select.vue";
import DatePicker from "@/components/views/DatePicker.vue";
import FormContainer from "@/components/views/FormContainer.vue";

import CommonFormView from "@/components/views/CommonFormView.vue";

import { useComponentManage, componentList } from "@/hooks/useComponentManage";

import Sortable, { SortableEvent } from "sortablejs";

let formSortList: Sortable[] = [];

export default defineComponent({
  name: "PreviewMain",
  components: {
    CommonFormView,
    Table,
    FormContainer,
    Input,
    Select,
    DatePicker,
  },
  setup() {
    const { componentList } = useComponentManage();

    return { componentList };
  },
});`;
    const language = "typescript";

    return { value, language };
  },
});
</script>