import { reactive, toRefs } from "vue";

import { curSelectComponent } from "./ComponentManage"

type propType = 'columns' | 'dataSource'

const reactiveData = reactive({
  columns: [] as any,
  dataSource: [] as any
  // columns: [
  //   {
  //     title: "姓名",
  //     dataIndex: "name",
  //   },
  //   {
  //     title: "年龄",
  //     dataIndex: "age",
  //   },
  //   {
  //     title: "住址",
  //     dataIndex: "address",
  //   },
  // ],
  // dataSource: [
  //   {
  //     id: '1', /* 唯一id 必填 */
  //     name: "胡彦斌",
  //     age: 32,
  //     address: "西湖区湖底公园1号",
  //   } as IDataSource,
  // ]
});

// watch(reactiveData.columns, () => {
//   console.log(reactiveData.columns)
// }, { deep: true })

const changeData = (prop: propType, res: any) => {
  reactiveData[prop] = res
  curSelectComponent.value[prop] = res
}

export const changeComponent = (component: any) => {
  for (let key in component) {
    changeData(key as propType, component[key])
  }
}

export const useConfig = () => {
  return {
    ...toRefs(reactiveData), changeData
  };
}