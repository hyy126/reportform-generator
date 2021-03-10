import { Moment } from 'moment';

export type componentType = "Table" | "FormContainer" | "Input" | "Select" | "DatePicker"

export const formTypeArray = ["Input", "Select", "DatePicker"]

export type componentConfigType = ITableComponent | IInputComponent | IFormComtainerComponent | ISelectComponent

export interface IFomGrid {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

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
  useFormCol?: Boolean   //是否使用上级表单栅格
  allowClear?: Boolean
}

export interface IComponent<T = componentConfigType> {
  type: componentType
  id: number | string
  children?: IComponent[]
  parent?: IComponent
  formAttribute?: IFormAttribute
  config: T
}

interface ITableColumn {
  title: string,
  dataIndex: string,
  key: string
}

export interface IDataSource {
  [key: string]: any
}

export const isTableComponent = (component: componentConfigType): component is ITableComponent => {
  return (<ITableComponent>component).columns !== undefined
}

/* 表格 */
export interface ITableComponent {
  columns: ITableColumn[]
  dataSource: IDataSource[]
}

/*单行文本 */
export interface IInputComponent {
  defaultValue?: string  //默认值
  prefix?: string        //前缀
  suffix?: string        //后缀
  maxlength?: number     //最大长度
  showCount?: boolean    //字数
  value?: string | number
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
  defaultPickerValue?: Moment
}