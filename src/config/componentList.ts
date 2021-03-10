import { standardModel } from './Model/model1';
export const componentList = [
  {
    title: "容器组件",
    key: "container",
    list: [
      {
        icon: "iconbiaodanbiaoqian",
        name: "表单容器",
        type: 'FormContainer'
      }
    ],
  },
  {
    title: "表单组件",
    key: "form",
    list: [
      {
        icon: "icondanhangwenben",
        name: "单行文本",
        type: 'Input'
      },
      {
        icon: "iconduoxuan",
        name: "多行文本",
      },
      {
        type: 'Select',
        icon: "iconxiala",
        name: "下拉选择",
      },
      {
        type: 'DatePicker',
        icon: "iconshijian",
        name: "日期选择",
      },
    ],
  },
  {
    title: "表格组件",
    key: "table",
    list: [
      {
        icon: "iconbiaoge",
        name: "表格",
        type: 'Table'
      },
    ],
  },
  {
    title: "自定义组件",
    key: "custom",
    list: []
  },
  {
    title: "模板",
    key: "model",
    list: [{
      name: "标准模板",
      list: standardModel
    }]
  },
];