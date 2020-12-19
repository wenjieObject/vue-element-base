<template>
  <div class="common-table">
    <el-table :data="tableData"  height="90%" border stripe v-loading="tableConfig.loading">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="item.label"
        :width="item.width ? item.width : 180"
        v-for="item in tableProp"
        :key="item.prop"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="tableConfig.total"
      @current-change="currentChange"
      :current-page.sync="tableConfig.currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableProp: Array,
    tableConfig: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleEdit(index, row) {
        this.$emit('handleEdit',row)
      //console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    currentChange(page){
        this.$emit("currentChange",page)
    }
  },
};
</script>

<style lang="scss" scoped>
.common-table {
  height: 520px;
  position: relative;
  .el-pagination {
    position: absolute;
    bottom: 0;
    right: 10px;
  }
}
</style>