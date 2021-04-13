import { Moment } from 'moment';

export type componentType = "Table" | "FormContainer" | "Input" | "Select" | "DatePicker"

export const formTypeArray = ["Input", "Select", "DatePicker"]

export type formType = "Input" | "Select" | "DatePicker"

export type componentConfigType = ITableComponent | IInputComponent | IFormComtainerComponent | ISelectComponent

type gridType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type IFomGrid = Record<gridType, number>

export type formItemSize = 'large' | 'default' | 'small'

export interface IFormAttribute {
  label?: string         //标签
  placeholder?: string   //占位符
  field?: string         //字段名
  grid?: IFomGrid
  showField?: boolean    //是否显示标签
  readonly?: boolean
  required?: boolean
  disabled?: boolean
  labelCol: IGridCol
  wrapperCol: IGridCol
  size?: formItemSize
  useFormCol?: boolean   //是否使用上级表单栅格
  allowClear?: boolean
  defaultValue?: string | number | Moment | null   //默认值
}

export interface IComponent<T = componentConfigType> {
  type: componentType
  id: number | string
  link?: string                     //文档链接
  children?: IComponent[]
  parent?: IComponent
  formAttribute?: IFormAttribute    //form表单通用属性
  config: T                         //组件配置
}

export interface ISortConfig {
  sort: boolean
  sortType: 'local' | 'server'  //排序方式  本地 | 服务端
  sortFunStr?: string            //排序方法字符串
}

export interface ISlots {
  customRender: string
  [key: string]: string
}

export interface ITableColumn {
  title: string
  dataIndex: string
  key: string
  sorter?: ((a: any, b: any) => boolean) | boolean | string
  sortDirections?: string[]
  sorterConfig: ISortConfig
  ellipsis?: boolean
  width?: number
  //colSpan?: number
  align?: 'left' | 'right' | 'center'
  fixed?: false | true | 'left' | 'right'
  children?: ITableColumn[] | null
  slots?: ISlots
}

export interface IDataSource {
  [key: string]: any
}

export const isTableComponent = (component: componentConfigType): component is ITableComponent => {
  return (<ITableComponent>component).columns !== undefined
}

// table row-selection
export interface IRowSelection {
  onChange?: (selectedRowKeys: any, selectedRows: any) => void
  selectedRowKeys?: string[]
  fixed?: boolean
  hideDefaultSelections?: boolean
  type?: 'checkbox' | 'radio'
  onSelect?: Function
  onSelectAll?: Function
  getCheckboxProps?: (record: any) => any
}

export interface IRowSelectionConfig {
  type: 'checkbox' | 'radio'
  fixed: boolean
  disabled: boolean
  disabledText: string
  defaultChecked: boolean
  defaultCheckedText: string
}

export interface ITableConfig {
  bordered?: boolean   //边框
  rowClassName?: (record: any, index: number) => string  //表格行类名
  rowClassNameStr?: string
  rowClassNameConfig: 'null' | 'striped' | 'custom'
  childrenColumnName?: string  //指定树形结构的列名
  defaultExpandAllRows?: boolean //初始时,是否展开所有行
  loading?: boolean         //页面是否加载中
  scroll?: {                //滚动设置
    x?: number | true
    y?: number
  },
  showHeader?: boolean  //是否显示表头
  size?: 'default' | 'middle' | 'small'
  rowSelection?: IRowSelection             //左列选择项
  rowSelectionConfig?: IRowSelectionConfig //选择项配置
}

/* 表格 */
export interface ITableComponent {
  columns: ITableColumn[]
  dataSource: IDataSource[]
  tableConfig: ITableConfig
}

/*单行文本 */
export interface IInputComponent {
  prefix?: string        //前缀
  suffix?: string        //后缀
  maxlength?: number     //最大长度
  showCount?: boolean    //字数
}

export interface IGridCol {
  span?: number
  offset?: number
}

/*表单容器 */
export interface IFormComtainerComponent {
  model?: object
  layout: 'horizontal' | 'vertical' | 'inline'
  labelCol: IGridCol
  wrapperCol: IGridCol
}

/*下拉选择器 */
export interface ISelectComponent {
  options: any[]
}

/*日期选择器 */
export interface IDatePickerComponent {
  format: string | string[]
  disabledTime?: (date: Date) => {}
  defaultPickerValue?: Moment | null
  valueFormat?: string
}