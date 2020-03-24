/* eslint-disable */

export default {
  data() {
    return {
      activeIndex: 1,
      activeName: 'one',
      GoodsAddForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: "",
        goods_introduce: '',
        pics: [],
        radio: '1'
      },
      options: [{
        value: "zhinan",
        label: "指南",
        children: [{
          value: "yizhi",
          label: "一致"
        }]
      }],
      defaultProps: {
        value: "cat_id",
        label: "cat_name"
      },
      dialogImageUrl: '',
      dialogVisible: false,
      headers: {
        Authorization: localStorage.getItem('token')
      },
      editorOption: {
        placeholder: '请写入商品内容'
      }
    };
  },
  created() {
    this.loadGoodsCat()
  },
  methods: {
    clicktabs(tab) {
      this.activeIndex = +tab.index + 1
    },
    next(index, name) {
      this.activeIndex = index
      this.activeName = name
    },
    async loadGoodsCat() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      this.options = res.data.data
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(res) {
      this.GoodsAddForm.pics = [{
        pic: res.data.tmp_path
      }]
    },
    async addGoods() {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
      } = this.GoodsAddForm
      console.log(goods_cat.join(','));


      let res = await this.$axios.post('goods', {
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      })
      if (res.data.meta.status === 201) {
        this.$message({
          message: '添加商品成功',
          type: 'success',
        })
        this.$router.push('/goods')
      }
      console.log(res);

    }
  },
};
