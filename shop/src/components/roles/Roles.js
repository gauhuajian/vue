/* eslint-disable */

export default {
  data() {
    return {
      RolesData: [],
      dialogAssignRightsFormVisible: true,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created() {
    this.loadRolesData();
  },
  methods: {
    async loadRolesData() {
      let res = await this.$axios.get(`roles`);
      this.RolesData = res.data.data;
    },
    indexMethods(index) {
      return index;
    }
  }
};
