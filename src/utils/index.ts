import { message } from "ant-design-vue";
import { App } from 'vue';
import jszip from "jszip";

message.config({
  //top: `250px`,
  duration: 2,
  maxCount: 3,
});

export { message }

export const installGlobalMessage = (app: App<Element>) => {
  app.config.globalProperties.$message = message
}

export const _callWithErrorHandling = async <T = any>(fn: Function): Promise<T> => {
  let res
  try {
    res = await fn()
  }
  catch (err) {
    //message.error(res?.message || '系统异常');
  }
  return res
}

//拷贝数组
export const copyArray = <T = any>(data: T[]): T[] => {
  return data.map((item: any) => ({ ...item }))
}

//拷贝对象
export const copyObject = <T = any>(data: object): T => {
  return JSON.parse(JSON.stringify(data))
}

interface IDeepFindParam {
  prop?: string,
  matchValue: any,
  childProp?: string,
  cleanChildProp?: boolean,
  hasDelete?: boolean
}

/**
 * 深度递归查询匹配对象
 * @param tree 
 * @param deepFindParam 
 * @return { parent, matchIndex }
 */
export const deepFind = <T = any>(tree: any, deepFindParam: IDeepFindParam): { parent: T[], matchIndex: number } => {
  const { prop = 'id', matchValue, childProp = 'children', cleanChildProp = false } = deepFindParam
  let matchIndex = -1
  let parent = tree

  for (let i = 0; i < tree.length; i++) {
    if (tree[i][prop] === matchValue) {
      matchIndex = i;
      break;
    }
    if (tree[i][childProp]) {
      const { parent: childParent, matchIndex: matchIndexChild } = deepFind<T>(tree[i][childProp], deepFindParam)
      if (matchIndexChild !== -1) {
        matchIndex = matchIndexChild
        parent = childParent;
        //删除父级元素children 属性
        if (cleanChildProp && parent.length === 1 && !deepFindParam.hasDelete) {
          deepFindParam.hasDelete = true
          delete tree[i][childProp]
        }
        break;
      }
    }
  }

  return { parent, matchIndex }
}

//文件导出
export const saveBlobAsFile = function (res: any, fileName: string = '下载文件') {
  let result = null;
  //返回的JSON格式
  if (res.headers["content-type"].indexOf("application/json") > -1) {
    //result = JSON.parse(Buffer.from(res.data).toString("utf8"));
    result = res.data
  }
  if (result) {
    message.error(result.message || "未知错误");
    return;
  }
  let headers = res.headers;
  let contentDisposition = headers["content-disposition"].replace(/["|']/g, "");
  let matched = /filename=(.*)/g.exec(contentDisposition)!;
  let filename = fileName || decodeURI(matched[1]);
  let blob = new Blob([res.data], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
  });
  exportFile(blob, filename)
};

export const exportFile = (blob: Blob, filename: string) => {
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = e => {
    //创建a标签，插入到文档中并click，最后移除
    let a = document.createElement("a");
    a.download = filename;
    a.href = e.target!.result as string;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}

export interface IFileObj {
  title: string
  content: string
}

//zip
export const exportZipFile = (fileList: IFileObj[]) => {
  let zip = new jszip();
  fileList.forEach((file) => {
    const { title, content } = file
    zip.file(title, content);
  })

  //var img = zip.folder("images")!;
  //img.file("Hello2.txt", "Hello2 World\n");

  zip.generateAsync({ type: "blob" }).then(function (content) {
    //saveAs(content, "example.zip");
    exportFile(content, "component.zip")
  });
}