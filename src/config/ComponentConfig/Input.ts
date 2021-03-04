import { IComponent, IInputComponent } from '@/typings/index';


export const InputConfig: IComponent<IInputComponent> = {
  type: 'Input',
  id: -1,  // uuid 唯一
  config: {
    label: '单行文本',
    placeholder: "",
    field: "fieildxxx",
    grid: 12,
    defaultValue: '',
    prefix: '',
    suffix: "",
    showField: true,
    allowClear: true,
    showCount: false,
    readonly: false,
    required: false,
    disabled: false,
    size: 'default',
    value: '',
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  },
  parent: undefined
}