<template>
  <ul class="operation-wrapper">
    <li @click="preview"><i class="iconfont iconyulan"></i>预览</li>
    <li>
      <a-upload
        v-model:file-list="fileList"
        name="file"
        :before-upload="beforeUpload"
      >
        <i class="iconfont icondaoru"></i>导入
      </a-upload>
    </li>
    <li @click="clearComponentList"><i class="iconfont iconempty"></i>清空</li>
    <li @click="code"><i class="iconfont icondaima"></i>代码</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from "vue";

import { useComponentManage } from "@/hooks/useComponentManage";
import { useImportFileText } from "@/hooks/useImportFileText";
import { message } from "@/utils";

export default defineComponent({
  name: "Operation",
  setup() {
    const origin = window.location.origin;

    //预览
    const preview = () => {
      window.open(`${origin}/preview`);
    };

    //代码
    const code = () => {
      window.open(`${origin}/code`);
    };

    const {
      clearComponentList,
      replaceComponentByModel,
    } = useComponentManage();

    //解析导入组件
    const analysisComponentJsonText = (text: string) => {
      try {
        let componentList = JSON.parse(text);
        replaceComponentByModel(componentList);
        message.success("组件导入成功");
      } catch (error) {
        message.error("文件解析异常,请上传正确格式组件json");
      }
    };

    const { fileList, beforeUpload } = useImportFileText(
      analysisComponentJsonText
    );

    return {
      preview,
      clearComponentList,
      code,
      fileList,
      beforeUpload,
    };
  },
});
</script>

<style lang="less" scoped>
.operation-wrapper:deep(.ant-upload) {
  color: @mainThemeColor !important;
}

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
