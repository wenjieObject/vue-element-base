<template>
  <el-form :inline="inline" :model="formModel">
    <el-form-item
      :label="item.label"
      v-for="item in formProp"
      :key="item.model"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="formModel[item.model]"
        :placeholder="'请输入' + item.label"
      ></el-input>
      <el-select v-if="item.type === 'select'" v-model="formModel[item.model]">
        <el-option
          :key="subItem.value"
          v-for="subItem in item.options"
          :label="subItem.label"
          :value="subItem.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <slot name="search"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: true,
    },
    //绑定的表单数据
    formModel: {
      type: Object,
      default: {},
    },
    //绑定的表单属性
    formProp: Array,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>