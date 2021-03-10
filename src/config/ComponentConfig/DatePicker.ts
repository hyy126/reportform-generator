import { IComponent, IDatePickerComponent } from '@/typings/index';
import { formAttribute } from '../formAttribute';


export const DatePickerConfig: IComponent<IDatePickerComponent> = {
  type: 'DatePicker',
  id: -1,  // uuid 唯一
  config: {
    format: "YYYY-MM-DD"
  },
  formAttribute: {
    label: '日期选择',
    ...formAttribute
  }
}