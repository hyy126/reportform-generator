import { ITableComponent } from '@/typings';
import { IComponent, componentType, formTypeArray } from '@/typings/index';
import { deepFind } from '@/utils/index';
import { changeTableComponent } from './useTableConfig';
import { getComponentConfigByType } from '@/config/ComponentConfig/index';
import { ref } from 'vue';

// 组件集合
export const componentList = ref<IComponent[]>([])

//当前选中组件
export const curSelectComponent = ref<IComponent>();

/**
 * 根据类型创建组件
 * @param type 
 */
const createComponent = (type: componentType) => {
  return getComponentConfigByType(type)
}

/**
 * 根据组件类型添加组件
 * @param type 
 */
const addComponent = (type: componentType) => {
  const component = createComponent(type)

  const isFormType = formTypeArray.includes(type)

  //表单元素插入到第一个表单容器children
  if (isFormType) {
    let firstFormContainer = null;
    for (let i = 0; i < componentList.value.length; i++) {
      if (componentList.value[i].type === "FormContainer") {
        firstFormContainer = componentList.value[i]
        break;
      }
    }
    //手动创建一个
    if (!firstFormContainer) {
      firstFormContainer = createComponent('FormContainer')
      componentList.value.unshift(firstFormContainer)
    }
    //构建父子链
    component.parent = firstFormContainer
    firstFormContainer.children?.push(component)
  }

  // bug fix   TableConfig.vue
  // cant use v-model value rerender(Defocus) & index (drag error)  so proxy key
  // if (type === 'Table' && isTableComponent(component.config)) {
  //   let columns = component.config.columns;
  //   columns.forEach((obj: any, index: number) => {
  //     columns[index] = new Proxy(obj, {
  //       get: function (target, propKey, receiver) {
  //         if (propKey === "key") {
  //           const value = Reflect.get(target, 'dataIndex', receiver)+'-mark';
  //           return value;
  //         }
  //         return Reflect.get(target, propKey, receiver);
  //       },
  //     })
  //   })
  // }
  selectComponent(component)
  if (!isFormType) {
    componentList.value.push(component)
  }
}

/**
 * 选中某个组件
 * @param component 
 */
const selectComponent = (component: IComponent) => {
  curSelectComponent.value = component
  if (component.type === 'Table') {
    changeTableComponent(component as IComponent<ITableComponent>)
  }
}

/**
 * 删除某个组件
 * @param component 
 */
const deleteComponent = (component: IComponent) => {
  let { parent, matchIndex } = deepFind(componentList.value, { matchValue: component.id })
  parent.splice(matchIndex, 1)
  //设置新的当前组件
  curSelectComponent.value = componentList.value[0] || {}
  if (curSelectComponent.value.type === 'Table') {
    changeTableComponent(curSelectComponent.value as IComponent<ITableComponent>)
  }
}

export const useComponentManage = () => {
  return {
    curSelectComponent,
    componentList,
    addComponent,
    deleteComponent,
    selectComponent
  }
} 