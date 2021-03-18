import { IComponent, ITableComponent } from "@/typings"

export const TableConfig: IComponent<ITableComponent> = {
  type: 'Table',
  id: -1,  // uuid 唯一
  link: 'https://2x.antdv.com/components/table-cn#API',
  config: {
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        key: "column0",
        colSpan: 1,
        align: 'left',
        fixed: false,
        children: [{
        } as any]
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "column1",
        colSpan: 1,
        align: 'left',
        fixed: false,
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "column2",
        colSpan: 1,
        align: 'left',
        fixed: false
      },
    ],
    dataSource: [
      {
        id: '1', /* 唯一id 必填 */
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
    ]
  }
}