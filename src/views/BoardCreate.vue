<template>
  <div>
    <div class="board_wrap">
      <div class="board_title">
        <strong>글작성</strong>
        <p>공지사항을 빠르고 정확하게 안내해드립니다.(게시글 discription)</p>
      </div>
      <!-- 글작성 게시판 body -->
      <div class="board_create_wrap">
        <div class="board_create">
          <div class="title">
            <span>제목</span>
            <input type="text" v-model="title" />
          </div>
          <div class="info">
            <textarea v-model="content"></textarea>
          </div>
        </div>
      </div>
      <div class="bt_wrap">
        <!-- <a @click="boardInsert" class="on">등록</a> -->
        <a @click="createBoard" class="on">등록</a>
        <a @click="pageBind" class="on">취소</a>
        <!-- <a href="#">수정</a> -->
      </div>
      <!-- 글작성 게시판 body -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      content: '',
    };
  },
  created() {},
  methods: {
    // 등록 파라미터
    createParam: function () {
      return {
        title: this.title,
        content: this.content,
        boardType: 'BEST',
        writer: this.$store.state.test.loingUserInfo.username,
        writeDate: new Date().getTime(),
      };
    },
    // 게시글 작성
    createBoard: function () {
      if (!this.$store.state.test.loingUserInfo.isLogin) return alert('로그인 해주세요');
      this.$axios
        .post('http://localhost:8080/board/boardInsert', this.createParam())
        .then((result) => {
          if (result.status === 200) {
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pageBind: function () {
      this.$router.push({
        name: 'boardList',
      });
    },
  },
};
</script>
<style scoped>
.board_create_wrap {
}
.board_create {
  font-size: 1.2rem;
  width: 100%;
  border: 1px solid #ddd;
}

.board_create .title {
  padding: 20px 15px;
  border-bottom: 1px dashed #ddd;
  font-size: 2rem;
}

.board_create .info {
  padding: 15px;
  border-bottom: 1px solid #999;
  font-size: 2rem;
}
</style>
