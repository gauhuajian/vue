/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      pagenum: 1,
      total: 1,
      queryText: "",
      stata: true,
      dialogaddUserFormVisible: true,
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
            max: 5,
            message: '输入内容应该在3-5之间',
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
    },
    clickCurrentpage(num) {
      this.loadUserData(num, this.queryText);
    },
    Query() {
      this.loadUserData(this.pagenum, this.queryText);
    }
  }
};
