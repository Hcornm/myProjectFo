<template>
  <div>
    <div class="board_wrap">
      <div class="board_title"></div>
      <div class="board_login">
        <input class="login_form" type="text" v-model="id" placeholder="아이디" />
        <br />
        <input class="login_form" type="password" v-model="pw" placeholder="비밀번호" @keyup.enter="loginTest(id, pw)" />
        <br />
        <input class="join_form" type="button" value="회원가입" @click="join" />
        <br />
        <input class="join_form" type="button" value="로그인" @click="loginTest(id, pw)" />
        <!-- {{ $store.state }} -->
      </div>
    </div>
  </div>
</template>
<script>
import common from "@/mixin/common";
export default {
  data() {
    return {
      id: "",
      pw: "",
    };
  },
  mixins: [common],
  methods: {
    loginTest2: function (id, pw) {
      console.log(id);
      console.log(pw);
    },
    loginTest: function (id, pw) {
      this.$axios
        .get("http://localhost:8080/members/login", { params: { username: id, password: pw } })
        .then((result) => {
          if (result.status === 200) {
            console.log(result, "result");
            this.$store.dispatch("test/userInfo", result.data);
            this.$router.push({
              name: "boardList",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert("로그인에 실패하였습니다");
        });
    },
    join: function () {
      alert("개발 중 입니다.");
    },
  },
};
</script>
<style scoped>
.board_login {
  width: 450px;
  height: 100%;
  font-size: 20px;
  border: 2px solid gray;
  text-align: center;
  margin: 0 auto;
}
.board_login .login_form {
  text-align: center;
  height: 30px;
  width: 360px;
  border-radius: 2px;
  font-size: 1rem;
  margin-top: 5px;
}
.board_login .join_form {
  height: 30px;
  width: 360px;
  background-color: gray;
  border-radius: 2px;
  font-size: 1rem;
  margin-top: 5px;
}
</style>
