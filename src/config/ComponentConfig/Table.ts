import { IComponent, ITableComponent } from "@/typings"

export const TableConfig: IComponent<ITableComponent> = {
  type: 'Table',
  id: -1,  // uuid 唯一
  config: {
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        key: "column0"
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "column1"
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "column2"
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