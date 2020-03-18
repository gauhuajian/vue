/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      pagenum: 1,
      total: 1,
      queryText: "",
      stata: true
    };
  },
  created() {
    this.loadUserData(1);
  },
  methods: {
    loadUserData(pagenum, query = "") {
      axios
        .get("http://localhost:8888/api/private/v1/users", {
          params: {
            query,
            pagenum: pagenum,
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          this.users = res.data.data.users;
          this.pagenum = res.data.data.pagenum;
          this.total = res.data.data.total;
        });
    },
    clickCurrentpage(num) {
      this.loadUserData(num, this.queryText);
    },
    Query() {
      this.loadUserData(this.pagenum, this.queryText);
    }
  }
};
