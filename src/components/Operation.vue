<template>
  <ul class="operation-wrapper">
    <li @click="preview"><i class="iconfont iconyulan"></i>预览</li>
    <li @click="importComp"><i class="iconfont icondaoru"></i>导入</li>
    <li @click="json"><i class="iconfont iconjson"></i>json</li>
    <li @click="clearComponentList"><i class="iconfont iconempty"></i>清空</li>
    <li @click="code"><i class="iconfont icondaima"></i>代码</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useComponentManage } from "@/hooks/useComponentManage";

export default defineComponent({
  name: "Operation",
  setup() {
    const origin = window.location.origin;
    const preview = () => {
      window.open(`${origin}/preview`);
    };

    const { clearComponentList } = useComponentManage();

    const code = () => {
      window.open(`${origin}/code`);
    };
    const json = () => {
      window.open(`${origin}/json`);
    };
    //导入
    const importComp = () => {
      const a = document.createElement("a");
      const blob = new Blob([
        `${JSON.stringify(
          JSON.parse(window.localStorage._componentlist),
          null,
          2
        )}`,
      ]);

      a.download = "fileName.json";
      a.style.display = "none";
      a.href = URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    return { preview, clearComponentList, code, json, importComp };
  },
});
</script>

<style lang="less" scoped>
.operation-wrapper {
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
  color: @mainThemeColor;
  height: 40px;
  justify-content: flex-end;
  box-shadow: 0px 6px 6px -6px #5e5e5e;
  li {
    margin-right: 10px;
    cursor: pointer;
    i {
      margin: 0 5px;
    }
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
