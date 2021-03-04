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

export const useTableConfig = () => {
  return {
    ...toRefs(reactiveData), changeData
  };
}