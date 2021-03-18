import { ITableColumn } from './../typings/index';
import { ITableComponent, IComponent } from '@/typings';
import { reactive, toRefs } from "vue";

import { curSelectComponent } from "./useComponentManage"

type propType = 'columns' | 'dataSource'

const reactiveData = reactive<ITableComponent>({
  columns: [],
  dataSource: []
});

const changeData = (prop: propType, res: any) => {
  reactiveData[prop] = res;
  (curSelectComponent as any).value.config[prop] = res
}

export const changeTableComponent = (component: IComponent<ITableComponent>) => {
  for (let key in component.config) {
    let copyKey = key as propType
    changeData(copyKey, component.config[copyKey])
  }
}

let uuid = 3;

const createColumn = () => {
  const dataIndex = "column-" + uuid++;
  let column: ITableColumn = {
    title: "demo列",
    dataIndex,
    key: dataIndex,
    colSpan: 1,
    align: 'left',
    fixed: false,
  };
  return column
}

const addColumn = () => {
  const column = createColumn()
  reactiveData.columns.push(column);
};

export const useTableConfig = () => {
  return {
    ...toRefs(reactiveData), changeData, addColumn, createColumn
  };
}