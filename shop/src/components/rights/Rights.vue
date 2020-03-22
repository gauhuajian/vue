<template>
  <el-table :data="rightsData" style="width: 100%">
    <el-table-column type="index" :index="indexMethods"></el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180"
    ></el-table-column>
    <el-table-column prop="path" label="路径" width="180"> </el-table-column>
    <el-table-column label="等级">
      <template slot-scope="scope">
        <span v-if="scope.row.level == 0">一级</span>
        <span v-else-if="scope.row.level == 1">二级</span>
        <span v-else>三级</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      rightsData: []
    };
  },
  created() {
    this.loadRightsData();
  },
  methods: {
    async loadRightsData() {
      let res = await this.$axios.get(`rights/list`);
      // res.data.data.map(
      //   itme =>
      //     (itme.level =
      //       itme.level == 0 ? "一级" : itme.level == 1 ? "二级" : "三级")
      // );
      this.rightsData = res.data.data;
    },
    indexMethods(index) {
      return index;
    }
  }
};
</script>
