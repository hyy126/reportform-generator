import { IComponent, ISelectComponent } from '@/typings/index';
import { formAttribute } from '../formAttribute';


export const SelectConfig: IComponent<ISelectComponent> = {
  type: 'Select',
  id: -1,  // uuid 唯一
  config: {
    options: [{
      value: 'select-value-1',
      label: '选项1',
      key: 'select-value-1',
    }, {
      value: 'select-value-2',
      label: '选项2',
      key: 'select-value-2'
    }, {
      value: 'select-value-3',
      label: '选项3',
      key: 'select-value-3'
    }]
  },
  parent: undefined,
  formAttribute: {
    label: '下拉选择',
    ...formAttribute
  }
}