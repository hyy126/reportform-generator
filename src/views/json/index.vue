<template>
  <Monaco :value="value" :language="language" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Monaco from "@/components/common/Monaco.vue";

export default defineComponent({
  name: "Operation",
  components:{Monaco},
  setup() {
    const value = `${JSON.stringify(
      JSON.parse(window.localStorage._componentlist),
      null,
      2
    )}`;
    const language = "json";

    return { value, language };
  },
});
</script>