/* eslint-disable */
export default {
  data() {
    return {
      users: [],
      pagenum: 1,
      total: 1,
      queryText: "",
      dialogaddUserFormVisible: false,
      addUserform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      dialogUPFormVisible: false,

      UPform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '输入内容应该在3-10之间',
            trigger: 'blur'
          },
        ],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '输入内容应该在5-10之间',
            trigger: 'blur'
          },
        ],
        email: [{
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '格式错误',
          trigger: 'blur'
        }],
        mobile: [{
          pattern: /^1(3|4|5|7|8)\d{9}$/,
          message: '格式错误',
          trigger: 'blur'
        }]
      },
      dialogAssignRoleFormVisible: false,
      Roleform: {
        username: '',
        id: '',
        rid: ''
      },
      roledata: {}
    };
  },
  created() {
    // console.log($route);
    const page = this.$route.params.page

    this.loadUserData(page);
    this.loadRoel()
  },
  methods: {
    async loadUserData(pagenum = 1, query = "") {
      try {
        const url = "users"
        const config = {
          params: {
            query,
            pagenum: pagenum,
            pagesize: 2
          }
        }
        let res = await this.$axios.get(url, config)
        this.users = res.data.data.users;
        this.pagenum = res.data.data.pagenum;
        this.total = res.data.data.total;
      } catch (error) {

      }
    },
    clickCurrentpage(num) {
      this.$router.push("/users/" + num);
      this.loadUserData(num, this.queryText);
    },
    Query() {
      this.loadUserData(this.pagenum, this.queryText);
    },
    showdialogaddUserFormVisible() {
      this.dialogaddUserFormVisible = true
    },
    async addUser() {
      let res = await this.$axios.post('users', this.addUserformx)
      if (res.data.meta.status === 201) {
        this.dialogaddUserFormVisible = false
        this.$message({
          message: '添加用户成功',
          type: 'success',
          duration: 800
        })
        this.loadUserData(1)
        this.$refs.addUserform.resetFields()
      }
    },
    closedDialog() {
      this.$refs.addUserform.resetFields()

    },
    async dleUser(id) {
      try {
        await this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        let res = await this.$axios.delete(`users/${id}`)
        if (res.data.meta.status === 200) {
          this.loadUserData(1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }
    },
    async stateChange(row) {
      let {
        id,
        mg_state: mg_state
      } = row;
      let res = await this.$axios.put(`users/${id}/state/${mg_state}`)
      if (res.data.meta.status == 200) {
        this.loadUserData(this.pagenum)
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
      }
    },
    showdialogUPFormVisible(row) {
      let {
        username,
        email,
        mobile,
        id
      } = row
      this.UPform.username = username
      this.UPform.email = email
      this.UPform.mobile = mobile
      this.UPform.id = id
      this.dialogUPFormVisible = true
    },
    async upUser() {
      const {
        id,
        email,
        mobile
      } = this.UPform
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      })
      if (res.data.meta.status == 200) {
        this.dialogUPFormVisible = false
        this.loadUserData(this.pagenum)
        this.$message({
          type: 'success',
          message: '编辑成功!',
        });
      }
    },
    async loadRoel() {
      let res = await this.$axios.get('roles')
      this.roledata = res.data.data
    },
    async showdialogAssignRoleFormVisible(row) {
      this.dialogAssignRoleFormVisible = true
      const {
        username,
        id
      } = row
      let rid = await this.$axios(`users/${id}`)
      this.Roleform.username = username
      this.Roleform.id = id
      this.Roleform.rid = rid.rid

    },
    async assignRole() {
      let {
        id,
        rid
      } = this.Roleform

      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      if (res.data.meta.status == 200) {
        this.dialogAssignRoleFormVisible = false
        this.$message({
          type: 'success',
          message: '设置成功!',
        });
        this.loadUserData(this.pagenum)
      }
    }
  }
};
