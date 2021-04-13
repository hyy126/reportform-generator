import { IRowSelectionConfig } from './../typings/index';
import { watchEffect, ref } from 'vue';
import { useTableConfig } from "@/hooks/useTableConfig";

const { tableConfig } = useTableConfig();

const rowSelectionConfig = tableConfig.value.rowSelectionConfig!

const showSelectionSwitch = ref(false);

const createRowSelection = (rowSelectionConfig: IRowSelectionConfig) => {
  const { type, fixed, disabled, disabledText, defaultChecked, defaultCheckedText } = rowSelectionConfig
  const evalContent = `({
    type: "${type}",
    fixed:${fixed},
    selectedRowKeys: [],
    onChange(selectedRowKeys, selectedRows){
      //tableConfig.value.rowSelection.selectedRowKeys = selectedRowKeys;
      this.selectedRowKeys = selectedRowKeys;
      console.log(this.selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: ${disabled ? disabledText ? disabledText : `"${disabledText}"` : false},
      defaultChecked: ${defaultChecked ? defaultCheckedText ? defaultCheckedText : `"${defaultCheckedText}"` : false},
    })
  })`;
  return evalContent
}

watchEffect(() => {
  showSelectionSwitch.value = tableConfig.value.rowSelection ? true : false;
})

watchEffect(() => {
  if (showSelectionSwitch.value) {
    const evalContent = createRowSelection(rowSelectionConfig)
    try {
      tableConfig.value.rowSelection = eval(evalContent)
    } catch (error) {
    }
  } else {
    delete tableConfig.value.rowSelection;
  }
})

export const useRowSelection = () => {
  return {
    showSelectionSwitch,
    rowSelectionConfig,
    createRowSelection
  }
}