export default {
  methods: {
    isLogin: function () {
      if (!this.$store.state.test.loingUserInfo.isLogin) {
        if (confirm('로그인 후 작성할 수 있습니다 \n로그인하시겠습니까?')) {
          // 로그인 페이지로 이동
          this.$router.push({
            name: 'login',
          });
        } else {
          return false;
        }
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
