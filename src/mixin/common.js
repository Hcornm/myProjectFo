export default {
  methods: {
    // 롱타입 변환
    dateToLong(date = 0) {
      return new Date(date) * 1;
    },
    // 컴마
    comma(num = "") {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    // 페이지 바인드
    boardListBind: function (value) {
      this.$router.push({
        name: `boardList${value}`,
        params: { boardType: value },
      });
    },
    infoPageBind: function (boardId) {
      this.$router.push({
        name: "boardInfo5",
        params: { boardId },
      });
    },
    // 로그인
    loginPageBind: function () {
      this.$router.push({
        name: "login",
      });
    },
  },
};
