import { ITableColumn } from './../typings/index';
import { ITableComponent, IComponent } from '@/typings';
import { reactive, toRefs } from "vue";

import { curSelectComponent } from "./useComponentManage"

type propType = 'columns' | 'dataSource'

const reactiveData = reactive<ITableComponent>({
  columns: [],
  dataSource: [],
  tableConfig: {
    rowClassNameConfig: 'null'
  }
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
  normalizeColumnSort(component.config.columns)
}

let uuid = 3;

const createColumn = () => {
  const dataIndex = "column-" + uuid++;
  let column: ITableColumn = {
    title: "demo列",
    dataIndex,
    key: dataIndex,
    align: 'left',
    fixed: false,
    sortDirections: ['ascend', 'descend'],
    sorterConfig: {
      sort: false,
      sortType: 'server'
    }
  };
  return column
}

const addColumn = () => {
  const column = createColumn()
  reactiveData.columns.push(column);
};

/**
 * 表格列 排序属性处理
 */
const normalizeColumnSort = (columns: ITableColumn[], shouldEval = true) => {
  columns.forEach((column: ITableColumn) => {
    const { sorterConfig, sorter } = column
    const { sort, sortType, sortFunStr } = sorterConfig

    if (sort) {
      if (sortType === 'server') {
        column.sorter = true
      } else {
        if (shouldEval) {
          let evalFun = () => { }
          try {
            evalFun = sorter || eval(`${sortFunStr}`) || false
          } catch (error) {
          }
          column.sorter = evalFun as any
        } else {
          column.sorter = sortFunStr
        }
      }
    } else {
      column.sorter = false
    }
  })
}

export const useTableConfig = () => {
  return {
    ...toRefs(reactiveData), changeData, addColumn, createColumn, normalizeColumnSort
  };
}