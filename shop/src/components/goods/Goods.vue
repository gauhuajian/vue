<template>
  <div>
    <el-button type="success" @click="go2GoodsAdd" plain>添加商品</el-button>
    <el-table :data="goodsData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="goods_number" label="商品数量" width="180">
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.add_time | deteFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
import moment from "moment";
export default {
  data() {
    return {
      goodsData: []
    };
  },
  created() {
    this.loadGoodsDate();
  },
  methods: {
    async loadGoodsDate() {
      let res = await this.$axios.get(`goods`, {
        params: {
          query: "",
          pagenum: 1,
          pagesize: 4
        }
      });
      this.goodsData = res.data.data.goods;
    },
    go2GoodsAdd() {
      this.$router.push("/goods-add");
    }
  },
  filters: {
    deteFilter(res) {
      return moment(res).format("YYYY-MM-DD");
    }
  }
};
</script>
