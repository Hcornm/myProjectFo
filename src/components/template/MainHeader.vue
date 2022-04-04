<template>
  <div>
    <div class="main_wrap">
      <div class="main_loginInfo">
        <div v-if="$store.state.test.loingUserInfo.isLogin"><a class="on" @click="loginPageBind">로그아웃</a></div>
        <div v-else><a class="on" @click="loginPageBind">로그인</a></div>
      </div>
      <img class="main_img" src="@/assets/images/naverlogo.png" @click="listPageBind" />
    </div>
  </div>
</template>
<script>
import common from "@/mixin/common";
export default {
  mixins: [common],
  methods: {
    listPageBind: function () {
      this.$router.push({
        name: "boardList",
      });
    },
  },
};
</script>

<style>
.main_wrap {
  width: 100%;
  height: 180px;
  /* background: red; */
  text-align: center;
}
.main_wrap .main_loginInfo {
  font-size: 20px;
  float: right;
  padding-right: 20px;
}
.main_loginInfo a {
  display: inline-block;
  min-width: 30px;
  margin-left: 10px;
  /* padding: 10px; */
  border: 1px solid #000;
  border-radius: 2px;
  font-size: 1rem;
}
.main_wrap img {
  height: 100%;
}
.main_img {
  margin: 0 auto;
  cursor: pointer;
}
</style>
