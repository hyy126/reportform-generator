import { nextTick, ref } from "vue";

export const useImportFileText = (fn: (text: string) => void) => {
  //文件列表
  const fileList = ref([]);

  //文件导入拦截
  const beforeUpload = (file: File) => {
    nextTick(() => {
      fileList.value = [];
    });
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = res => {
      fn(res.target!.result as string)
    };
    return false;
  };

  return {
    fileList, beforeUpload
  }
}