export default {
  methods: {
    isLogin: function () {
      if (!this.$store.state.test.loingUserInfo.isLogin) {
        alert("로그인 후 작성할 수 있습니다");
        return false;
      } else {
        return true;
      }
    },
    isCreateUserCheck: function (value, type) {
      if (this.$store.state.test.loingUserInfo.memberId !== value) {
        alert(`댓글 ${type}는 본인만 할 수 있습니다.`);
        return false;
      } else {
        return true;
      }
    },
  },
};
