<template>
  <div>
    <common-form :inline="true" :formProp="formProp" :formModel="formModel">
      <!-- 子组件插槽，下面这个按钮会替换子组件中的slot -->
      <el-button slot="search" type="primary" @click="onSubmit">查询</el-button>
    </common-form>

    <common-table
      :tableData="tableData"
      :tableProp="tableProp"
      :tableConfig="tableConfig"
      @currentChange="currentChange"
      @handleEdit="handleEdit"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm";
import CommonTable from "../../components/CommonTable";

export default {
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      formProp: [
        {
          model: "keyword",
          label: "用户名",
          type: "input",
        },
        {
          model: "password",
          label: "密码",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 0 },
          ],
        },
      ],
      formModel: {
        keyword: "",
        password: "",
        sex: 1,
      },
      tableProp: [
        {
          prop: "date",
          label: "日期",
          width: 150,
        },
        {
          prop: "name",
          label: "姓名",
          width: 120,
        },
        {
          prop: "address",
          label: "地址",
          width: 280,
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        
      ],
      tableConfig: {
        currentPage: 1,
        total: 100,
        loading: false, //控制表格加载
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formModel);
    },
    currentChange(page) {
      //监听子组件的方法，子组件emit之后调用该方法
      console.log(page);
    },
    handleEdit(row){
        console.log(row)
    }
  },
};
</script>


<style lang="scss" scoped>
</style>