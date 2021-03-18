 <template>
  <a-input
    v-model:value="formAttribute.defaultValue"
    :placeholder="formAttribute.placeholder"
    :allowClear="formAttribute.allowClear"
    :disabled="formAttribute.disabled"
  />
</template> 

 <script lang="tsx">
import { IFormAttribute, IInputComponent } from "@/typings";
import { defineComponent, h, PropType } from "vue";
import { Input } from "ant-design-vue";
export default defineComponent({
  name: "Input",
  props: {
    componentProp: Object as PropType<IInputComponent>,
    model: Object,
    formAttribute: Object as PropType<IFormAttribute>,
  },
  setup(prop) {},
});
</script>
