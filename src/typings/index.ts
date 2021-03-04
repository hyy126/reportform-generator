export type componentType = "Table" | "Input" | "FormContainer"

export const formTypeArray = ["Input"]

export type componentConfigType = ITableComponent | IInputComponent | IFormComtainerComponent

export interface IComponent<T = componentConfigType> {
  type: componentType
  id: number
  children?: IComponent[]
  parent?: IComponent
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
  label?: string         //标签
  placeholder?: string   //占位符
  field?: string         //字段名
  grid: number           //栅格
  defaultValue?: string  //默认值
  prefix?: string        //前缀
  suffix?: string        //后缀
  maxlength?: number     //最大长度
  showField?: boolean    //是否显示标签
  allowClear?: boolean   //能否清空
  showCount?: boolean    //字数
  readonly?: boolean
  required?: boolean
  disabled?: boolean
  size?: 'large' | 'default' | 'small'
  value?: string | number
  labelCol: IGridCol
  wrapperCol: IGridCol
}

export interface IGridCol {
  span?: number
  offset?: number
}

/*表单容器 */
export interface IFormComtainerComponent {
  model?: object
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelCol?: IGridCol
  wrapperCol?: IGridCol
}