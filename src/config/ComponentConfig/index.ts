import { formTypeArray } from './../../typings/index';
import { copyObject } from '@/utils/index';
import { TableConfig } from "./Table"
import { InputConfig } from "./Input"
import { SelectConfig } from "./Select"
import { DatePickerConfig } from "./DatePicker"
import { FormContainerConfig } from "./FormContainer"
import { IComponent, componentType } from '@/typings';

const componentConfigObj = {
  'Table': TableConfig,
  'Input': InputConfig,
  'FormContainer': FormContainerConfig,
  'Select': SelectConfig,
  'DatePicker': DatePickerConfig
}

//防止重复id
let uuidMap = new Map()

export const getComponentConfigByType = (type: componentType): IComponent => {
  let sourceComponent = componentConfigObj[type]

  let component = copyObject<IComponent>(sourceComponent)
  let timestamp = (new Date()).getTime();
  let uuidValue = uuidMap.get(timestamp)
  uuidMap.set(timestamp, uuidValue ? uuidValue + 1 : 1)

  component.id = uuidValue ? timestamp + '-' + uuidValue : timestamp
  if (formTypeArray.includes(type)) {
    (component.formAttribute as any).field = "field-" + timestamp;
  }
  return component
}