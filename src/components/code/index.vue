<template>
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