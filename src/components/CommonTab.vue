<template>
  <div class="tagdiv">
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name!=='home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      size="medium"
      @click="clickTag(tag)"
      :effect="$route.name===tag.name?'dark':'light'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  data() {
    return {};
  },
  methods: {
    handleClose(tag) {
      //获取当前tag之前的tag
      let result = this.tags.findIndex(item => item.name === tag.name)
      if(result>0){
        let newTag=this.tags[result-1]
        this.$router.push({name:newTag.name})
        this.$store.commit('selectMenu',newTag)
      }
      this.$store.commit("closeTab", tag);
    },
    clickTag(tag){
      this.$router.push({name:tag.name})
      this.$store.commit('selectMenu',tag)
    }
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 5px;
}
.tagdiv {
  padding-top: 5px;
  padding-left: 5px;
  cursor:pointer
}
</style>