import { IFormAttribute, formType, componentConfigType } from "@/typings";
import { defineComponent, h, PropType } from "vue";
import { Input, Select, DatePicker } from "ant-design-vue";

const componentMap: Record<formType, any> = {
  Input,
  Select,
  DatePicker
}

export default defineComponent({
  name: "renderFormItem",
  props: {
    type: {
      type: String as PropType<formType>,
      required: true
    },
    componentProp: {
      type: Object as PropType<componentConfigType>,
      required: true,
    },
    formAttribute: {
      type: Object as PropType<IFormAttribute>,
      required: true,
    },
  },
  setup(prop) {
    return () =>
      h(componentMap[prop.type], {
        ...prop.formAttribute,
        ...prop.componentProp,
        value: prop.formAttribute.defaultValue,
        "onUpdate:value": (v: any) => {
          console.log(v, typeof v)
          prop.formAttribute.defaultValue = v;
        },
      });
  },
});