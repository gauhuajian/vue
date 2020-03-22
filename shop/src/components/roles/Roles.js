/* eslint-disable */

export default {
  data() {
    return {
      RolesData: [],
      dialogAssignRightsFormVisible: false,
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: 0
    };
  },
  created() {
    this.loadRolesData();
    this.loadAllRightsData()
  },
  methods: {
    async loadRolesData() {
      let res = await this.$axios.get(`roles`);
      this.RolesData = res.data.data;
    },
    indexMethods(index) {
      return index;
    },
    async loadAllRightsData() {
      let res = await this.$axios(`rights/tree`)
      this.treedata = res.data.data
    },
    showdialogAssignRights(row) {
      this.dialogAssignRightsFormVisible = true
      let keys = []
      this.roleId = row.id
      this.$nextTick(() => {
        row.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            item2.children.forEach(item3 => {
              keys.push(item3.id)
            })
          })
        })
        this.$refs.tree.setCheckedKeys(keys);
      })
    },
    async AssignRights() {
      let keys1 = this.$refs.tree.getCheckedKeys()
      let keys2 = this.$refs.tree.getHalfCheckedKeys()
      let keys = keys1.concat(keys2)
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      if (res.data.meta.status == 200) {
        this.dialogAssignRightsFormVisible = false
        this.$message({
          message: '分配成功',
          type: 'success'
        });
        this.loadRolesData()
      }
    }
  }
};
