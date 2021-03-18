import { IComponent, IInputComponent } from '@/typings/index';
import { formAttribute } from '../formAttribute';


export const InputConfig: IComponent<IInputComponent> = {
  type: 'Input',
  id: -1,  // uuid 唯一
  config: {
    prefix: '',
    suffix: "",
    showCount: false,
  },
  parent: undefined,
  formAttribute: {
    label: '单行文本',
  ...formAttribute
  }
}