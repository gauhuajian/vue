/* eslint-disable */
import axios from "axios";
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
      }
    };
  },
  created() {
    this.loadUserData(1);
  },
  methods: {
    async loadUserData(pagenum, query = "") {
      try {
        const url = "http://localhost:8888/api/private/v1/users"
        const config = {
          params: {
            query,
            pagenum: pagenum,
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
        let res = await axios.get(url, config)
        this.users = res.data.data.users;
        this.pagenum = res.data.data.pagenum;
        this.total = res.data.data.total;
      } catch (error) {

      }
    },
    clickCurrentpage(num) {
      this.loadUserData(num, this.queryText);
    },
    Query() {
      this.loadUserData(this.pagenum, this.queryText);
    },
    showdialogaddUserFormVisible() {
      this.dialogaddUserFormVisible = true
    },
    async addUser() {
      let res = await axios.post('http://localhost:8888/api/private/v1/users', this.addUserform, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
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

        let res = await axios.delete(`http://localhost:8888/api/private/v1/users/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
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
      let res = await axios.put(`http://localhost:8888/api/private/v1/users/${id}/state/${mg_state}`, null, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      if (res.data.meta.status == 200) {
        this.loadUserData(this.pagenum)
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
      }
    }
  }
};
