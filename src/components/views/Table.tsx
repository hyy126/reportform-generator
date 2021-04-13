import { ITableComponent } from "@/typings";
import { defineComponent, PropType} from "vue";

import "@/assets/style/module/Table.less";

export default defineComponent({
  name: "Table",
  props: {
    componentProp: {
      type: Object as PropType<ITableComponent>,
      required: true,
    },
  },
  setup(prop) {
    const tableConfig = prop.componentProp.tableConfig;

    const tableChange = (...args: any[]) => {
      console.log(args);
    };

    // const slots = {
    //   test: (slotProps: any) => {
    //     return (
    //       <a-button size="small" type="primary">
    //         666
    //       </a-button>
    //     );
    //   },
    // };

    return () => (
      <a-table
        class="my-table"
        dataSource={prop.componentProp.dataSource}
        columns={prop.componentProp.columns}
        rowKey={(record: any) => record.id}
        {...tableConfig}
        // bordered={tableConfig.bordered}
        // defaultExpandAllRows={tableConfig.defaultExpandAllRows}
        // childrenColumnName={tableConfig.childrenColumnName}
        // loading={tableConfig.loading}
        // scroll={tableConfig.scroll}
        // show-header={tableConfig.showHeader}
        // size={tableConfig.size}
        // row-selection={tableConfig.rowSelection}
        // row-className={tableConfig.rowClassName}
        on-change={tableChange}
        //v-slots={slots}
      ></a-table>
    );
  },
});
