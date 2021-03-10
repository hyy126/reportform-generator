<template>
  <section id="monaco" ref="monacoEl"></section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { editor } from "monaco-editor";
export default defineComponent({
  name: "Monaco",
  props: {
    value: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  setup(prop) {
    const monacoEl = ref<HTMLElement>();
    let model: editor.ITextModel;
    let monacoInstance: editor.IStandaloneCodeEditor;
    onMounted(() => {
      monacoInstance = editor.create(monacoEl.value!, {
        theme: "vs-dark",
        automaticLayout: true,
        model,
      });

      watchEffect(() => {
        model = editor.createModel(prop.value, prop.language);
        monacoInstance.setModel(model);
      });
    });

    onUnmounted(() => {
      monacoInstance.dispose(); //使用完成销毁实例
    });

    return {
      monacoEl,
    };
  },
});
</script>

<style lang="less" scoped>
#monaco {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>