<template>
  <MonacoWrapper :tabList="tabList" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MonacoWrapper from "@/components/common/MonacoWrapper.vue";
import { genCode } from "@/utils/genCode";
import { useComponentManage } from "@/hooks/useComponentManage";

export default defineComponent({
  name: "Operation",
  components: { MonacoWrapper },
  setup() {
    const { componentList } = useComponentManage();
    const { indexTemplate, formTemplate, tableTemplate } = genCode(
      componentList.value
    );

    const tabList = [
      {
        value: indexTemplate,
        language: "html",
        icon: "iconvue",
        title: "index.vue",
      },
      {
        value: tableTemplate,
        language: "html",
        icon: "iconvue",
        title: "table.vue",
      },
      {
        value: formTemplate,
        language: "html",
        icon: "iconvue",
        title: "form.vue",
      },
      // {
      //   value: script,
      //   language: "typescript",
      //   icon: "iconjs",
      //   title: "script",
      // },
      // {
      //   value: css,
      //   language: "css",
      //   icon: "iconcss",
      //   title: "css",
      // },
      {
        value: `${JSON.stringify(
          JSON.parse(window.localStorage._componentlist),
          null,
          2
        )}`,
        language: "json",
        icon: "iconjson",
        title: "index.json",
      },
    ];

    return { tabList };
  },
});
</script>