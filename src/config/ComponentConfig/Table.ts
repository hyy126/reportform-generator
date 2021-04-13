import { IComponent, ITableComponent } from "@/typings"

export const TableConfig: IComponent<ITableComponent> = {
  type: 'Table',
  id: -1,  // uuid 唯一
  link: 'https://2x.antdv.com/components/table-cn#API',
  config: {
    tableConfig: {
      bordered: false,
      rowClassNameConfig: 'null',
      childrenColumnName: 'children',
      defaultExpandAllRows: false,
      loading: false,
      scroll: {},
      showHeader: true,
      size: 'default',
      rowSelectionConfig: {
        type: 'checkbox',
        fixed: true,
        disabled: false,
        disabledText: '',
        defaultChecked: false,
        defaultCheckedText: ''
      }
      //rowSelection: {
      // type: 'checkbox',
      // onChange: (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
      //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // },
      // //selectedRowKeys: [],
      // getCheckboxProps: (record) => ({
      //   disabled: record.id === '1', // Column configuration not to be checked
      //   name: record.name,
      // }),
      //}
    },
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        key: "column0",
        //colSpan: 1,
        align: 'left',
        fixed: false,
        sortDirections: ['ascend', 'descend'],
        sorterConfig: {
          sort: false,
          sortType: 'server'
        },
        slots: { customRender: "test" },
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "column1",
        //colSpan: 1,
        align: 'left',
        fixed: false,
        sortDirections: ['ascend', 'descend'],
        sorterConfig: {
          sort: false,
          sortType: 'server'
        }
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "column2",
        //colSpan: 1,
        align: 'left',
        fixed: false,
        sortDirections: ['ascend', 'descend'],
        sorterConfig: {
          sort: false,
          sortType: 'server'
        }
      },
    ],
    dataSource: [
      {
        id: '1', /* 唯一id 必填 */
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        id: '2',
        name: "胡彦斌2",
        age: 32,
        address: "西湖区湖底公园2号",
      },
    ]
  }
}