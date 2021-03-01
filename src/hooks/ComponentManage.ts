import { deepFind } from './../utils/index';
import { changeComponent } from './useConfig';
import { getComponentConfigByType, componentType } from '@/config/ComponentConfig/index';
import { ref } from 'vue';

const componentList = ref([] as any)

let uuid = 0;

export const curSelectComponent = ref({} as any);

const addComponent = (type: componentType) => {
  let component = getComponentConfigByType(type)
  component.id = uuid++;
  // bug fix   TableConfig.vue
  // cant use v-model value(Defocus) & index (drag error)  so proxy key
  if (type === 'Table') {
    component.columns.forEach((obj: any, index: number) => {
      component.columns[index] = new Proxy(obj, {
        get: function (target, propKey, receiver) {
          if (propKey === "key") {
            const value = Reflect.get(target, 'dataIndex', receiver);
            return value;
          }
          return Reflect.get(target, propKey, receiver);
        },
      })
    })
  }
  selectComponent(component)
  componentList.value.push(component)
}

const selectComponent = (component: any) => {
  curSelectComponent.value = component
  changeComponent(component)
}

const deleteComponent = (component: any) => {
  let { parent, matchIndex } = deepFind(componentList.value, { matchValue: component.id })
  parent.splice(matchIndex, 1)
}

export const ComponentManage = () => {
  return {
    curSelectComponent,
    componentList,
    addComponent,
    deleteComponent,
    selectComponent
  }
} 