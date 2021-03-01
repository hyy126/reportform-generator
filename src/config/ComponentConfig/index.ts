import { copyObject } from '@/utils/index';
import TableConfig from "./Table"


export type componentType = 'Table'

const componentConfigObj = {
  'Table': TableConfig,
}

export const getComponentConfigByType = (type: componentType): any => {
  return copyObject(componentConfigObj[type])
}