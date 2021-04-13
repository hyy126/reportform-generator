import { useTableConfig } from '@/hooks/useTableConfig';
import { ITableColumn } from './../typings/index';
import { copyArray } from './index';
import { useRowSelection } from '@/hooks/useRowSelection';
import { beautifyJs, beautifyHtml } from './beautify';
import { IComponent, ITableComponent, IFormComtainerComponent } from '@/typings';

/**
 * 处理表格列数据
 * @param columns 
 */
const handleTableColumn = (columns: ITableColumn[]): string => {
  const columnCopy = copyArray<ITableColumn>(columns)

  const { normalizeColumnSort } = useTableConfig()

  normalizeColumnSort(columnCopy, false)

  let columnsStr = JSON.stringify(columnCopy, (key: string, value: any) => {
    if (key === 'key') {
      return
    }
    // 过滤默认属性
    if (key === 'fixed' && !value) {
      return
    }
    if (key === 'align' && value === 'left') {
      return
    }
    if (key === 'sortDirections' && JSON.stringify(value) === '["ascend","descend"]') {
      return
    }
    if (key === 'sorterConfig') {
      return
    }
    if (key === 'sorter' && typeof value === 'string') {
      return `_TT${value}_TT`
    }
    return value
  }, 2)

  //将函数字符串变为函数
  columnsStr = columnsStr.replace(/\"_TT/g, "").replace(/\_TT"/g, "")

  return columnsStr
}

/**
 * 表格代码
 * @param component 
 */
export const genTable = (component: IComponent<ITableComponent>) => {
  const { id, config } = component
  const { columns, dataSource, tableConfig } = config

  const { rowClassNameConfig, bordered, defaultExpandAllRows, childrenColumnName, scroll, showHeader, size, rowSelectionConfig, rowSelection, rowClassNameStr } = tableConfig

  const { createRowSelection } = useRowSelection()

  let rowSelectionStr = ''
  if (rowSelection) {
    rowSelectionStr = createRowSelection(rowSelectionConfig!)
  }

  const dataSourceStr = JSON.stringify(dataSource, null, 2)

  const columnsStr = handleTableColumn(columns)

  let htmlCode = `<a-table
    class="my-table"
    :dataSource="dataSource"
    :columns="columns"
    :rowKey="(record) => record.id"
    ${bordered ? `:bordered="true"` : ''}
    ${defaultExpandAllRows ? `:defaultExpandAllRows="true"` : ''}
    ${childrenColumnName && childrenColumnName !== 'children' ? `:childrenColumnName="${childrenColumnName}"` : ''}
    ${!showHeader ? `:show-header="false"` : ''}
    ${size !== 'default' ? `:size="${size}"` : ''}
    ${(scroll && (scroll.x || scroll.y)) ? `:scroll="${JSON.stringify(scroll)}"` : ''}
    ${rowClassNameStr ? `:row-className="${rowClassNameStr}"` : ''}
    ${rowSelection ? `:row-selection="rowSelection"` : ''}
    :loading="loading"
    @change="tableChange"
  />`;

  //去除空行
  htmlCode = htmlCode.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')

  let jsCode = `
  export default defineComponent({
  name: "Table-${id}",
  setup() {
    const reactiveData = reactive({
      dataSource: ${dataSourceStr},
      columns: ${columnsStr},
      loading:false
    });

    ${rowSelection ? `const rowSelection = ${rowSelectionStr}` : ''}

    const tableChange = (...args: any[]) => {
      
    };

    return {
      ...toRefs(reactiveData),
      tableChange,
      ${rowSelection ? `rowSelection` : ''}
    };
  },
  });`

  //beautifyHtml(htmlCode)
  let beautifyHtmlCode = htmlCode
  let beautifyJsCode = beautifyJs(jsCode)

  let cssStr = ``
  //添加class样式
  if (rowClassNameConfig === 'striped') {
    cssStr += `
    <style lang="less" scoped>
    .my-table:deep(.table-striped) {
      background-color: #fafafa;
    }
    </style>`
  }
  return `
  <template>
    ${beautifyHtmlCode}
  </template>
  <script lang="ts">
  import { defineComponent, reactive, toRefs } from "vue";

  ${beautifyJsCode}
  </script>
  ${cssStr}
  `
}

/**
 * 首页代码
 * @param componentList 
 */
export const genIndex = (componentList: IComponent[]) => {
  return `<template>
  <section class="wrapper">
    <CustomForm />
    <CustomTable />
  </section>
</template>

<script>
import { ref, reactive, provide } from "vue";
import CustomForm from "./Form";
import CustomTable from "./Table";

//import { getOrderTableList } from "@/api/privacyList/marketDepartment";

export default {
  name: "marketDepartmentOrderList",
  components: { CustomForm, CustomTable },
  setup() {
    const query = reactive({
      //分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      //表单信息
      form: {},
    });

    //表格数据
    let tableData = ref([]);

    //请求方法
    const sendRequest = async () => {
      // let res = await getOrderTableList(query.page, query.form);
      // const { list, total } = res.data.result;
      // tableData.value = list || [];
      // query.page.total = total;
    };

    //分页信息改变事件
    const pageChange = (page) => {
      const { pageSize, currentPage } = page;
      query.page = {
        pageSize,
        currentPage,
      };
      sendRequest();
    };

    //表单信息改变
    const formChange = (form) => {
      query.form = form;
      sendRequest();
    };

    //依赖注入
    provide("pageChange", pageChange);
    provide("pageParam", query.page);
    provide("tableData", tableData);

    provide("formChange", formChange);
  },
};
</script>
`
}

/**
 * 
 * @param component 表单代码
 */
export const genForm = (component: IComponent<IFormComtainerComponent>) => {

  let htmlCode = `<a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
  <a-form-item label="Activity name">
    <a-input v-model:value="formState.name" />
  </a-form-item>
  <a-form-item label="Activity zone">
    <a-select v-model:value="formState.region" placeholder="please select your zone">
      <a-select-option value="shanghai">Zone one</a-select-option>
      <a-select-option value="beijing">Zone two</a-select-option>
    </a-select>
  </a-form-item>
  <a-form-item label="Activity time">
    <a-date-picker
      v-model:value="formState.date1"
      show-time
      type="date"
      placeholder="Pick a date"
      style="width: 100%"
    />
  </a-form-item>
  <a-form-item label="Instant delivery">
    <a-switch v-model:checked="formState.delivery" />
  </a-form-item>
  <a-form-item label="Activity type">
    <a-checkbox-group v-model:value="formState.type">
      <a-checkbox value="1" name="type">Online</a-checkbox>
      <a-checkbox value="2" name="type">Promotion</a-checkbox>
      <a-checkbox value="3" name="type">Offline</a-checkbox>
    </a-checkbox-group>
  </a-form-item>
  <a-form-item label="Resources">
    <a-radio-group v-model:value="formState.resource">
      <a-radio value="1">Sponsor</a-radio>
      <a-radio value="2">Venue</a-radio>
    </a-radio-group>
  </a-form-item>
  <a-form-item label="Activity form">
    <a-input v-model:value="formState.desc" type="textarea" />
  </a-form-item>
  <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
    <a-button type="primary" @click="onSubmit">Create</a-button>
    <a-button style="margin-left: 10px">Cancel</a-button>
  </a-form-item>
</a-form>`;

  let jsCode = `import { Moment } from 'moment';
import { defineComponent, reactive, toRaw, UnwrapRef } from 'vue';
interface FormState {
  name: string;
  region: string | undefined;
  date1: Moment | undefined;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    });
    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
    };
  },
});`

  let beautifyHtmlCode = beautifyHtml(htmlCode)
  let beautifyJsCode = beautifyJs(jsCode)

  return `
  <template>
    ${beautifyHtmlCode}
  </template>
  <script lang="ts">
    ${beautifyJsCode}
  </script>
  `
}

/**
 * 生成代码
 * @param componentList 
 */
export const genCode = (componentList: IComponent[]) => {
  let tableTemplate = '';
  let formTemplate = '';
  let indexTemplate = genIndex(componentList)
  componentList.forEach((component: IComponent) => {
    if (component.type === 'Table') {
      tableTemplate = genTable(component as IComponent<ITableComponent>)
    } else if (component.type === 'FormContainer') {
      formTemplate = genForm(component as IComponent<IFormComtainerComponent>)
    }
  })

  return {
    indexTemplate,
    formTemplate,
    tableTemplate
  }
}