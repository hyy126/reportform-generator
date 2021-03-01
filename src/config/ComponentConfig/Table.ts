export interface IDataSource {
  [key: string]: any
}

const TableConfig = {
  type: 'Table',
  id: -1,  // uuid 唯一
  columns: [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
    },
  ],
  dataSource: [
    {
      id: '1', /* 唯一id 必填 */
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    } as IDataSource,
  ]
}

export default TableConfig 