import { formTypeArray } from './../../typings/index';
import { copyObject } from '@/utils/index';
import { TableConfig } from "./Table"
import { InputConfig } from "./Input"
import { FormContainerConfig } from "./FormContainer"
import { IComponent, componentType } from '@/typings';

const componentConfigObj = {
  'Table': TableConfig,
  'Input': InputConfig,
  'FormContainer': FormContainerConfig
}

let fielduuid = 0;

// 组件唯一id 自增
let uuid = 0;

export const getComponentConfigByType = (type: componentType): IComponent => {
  let component = copyObject<IComponent>(componentConfigObj[type])
  component.id = uuid++;
  if (formTypeArray.includes(type)) {
    (component.config as any).field = "field-" + fielduuid++
  }
  return component
}