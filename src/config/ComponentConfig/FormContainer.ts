import { IComponent, IFormComtainerComponent } from '@/typings/index';

export const FormContainerConfig: IComponent<IFormComtainerComponent> = {
  type: 'FormContainer',
  id: -1,  // uuid 唯一
  config: {
    model: {},
    layout: "horizontal",
    labelCol: {
      span: 8,
      //offset:3
    },
    wrapperCol: {
      span: 16
    },
  },
  children: []
}