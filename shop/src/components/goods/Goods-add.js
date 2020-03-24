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
    }
  },
};
