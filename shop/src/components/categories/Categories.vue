<template>
  <div>
    <el-button type="success" plain @click="showdialogAddCatFormVisible"
      >添加分类</el-button
    >
    <el-table :data="cateData" style="width: 100%">
      <el-table-tree-column
        prop="cat_name"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        label="分类名称"
        :indentSize="20"
        width="220"
      ></el-table-tree-column>
      <el-table-column label="是否有效" width="180">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? "否" : "是" }}
        </template>
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level == 0">一级</span>
          <span v-else-if="scope.row.cat_level == 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" :visible.sync="dialogAddCatFormVisible">
      <el-form :model="addCatform" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="addCatform.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            v-model="addCatform.cat_pid_arr"
            :options="options"
            :props="defaultProps"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCatFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCatData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import ElTreeGrid from "element-tree-grid";
Vue.component(ElTreeGrid.name, ElTreeGrid);
export default {
  data() {
    return {
      cateData: [{}],
      dialogAddCatFormVisible: false,
      addCatform: {
        cat_pid_arr: [],
        cat_name: ""
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "yizhi",
              label: "一致"
            }
          ]
        }
      ],
      defaultProps: {
        value: "cat_id",
        label: "cat_name"
      }
    };
  },
  created() {
    this.loadCateDate();
    this.loadCateDate2();
  },
  methods: {
    async loadCateDate() {
      let res = await this.$axios.get(`categories`, {
        params: {
          query: "",
          pagenum: "1",
          pagesize: 4
        }
      });
      this.cateData = res.data.data.result;
    },
    async loadCateDate2() {
      let res = await this.$axios.get(`categories`, {
        params: {
          type: 2
        }
      });
      this.options = res.data.data;
    },
    showdialogAddCatFormVisible() {
      this.dialogAddCatFormVisible = true;
    },
    async addCatData() {
      const { cat_pid_arr, cat_name } = this.addCatform;
      let res = await this.$axios.post(`categories`, {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name: cat_name,
        cat_level: cat_pid_arr.length
      });
      if (res.data.meta.status == 201) {
        this.dialogAddCatFormVisible = false;
        this.loadCateDate();
        this.$message({
          type: "success",
          message: "添加成功!"
        });
      }
    }
  }
};
</script>
