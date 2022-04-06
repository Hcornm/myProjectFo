<template>
  <div>
    <!-- <h2>공지사항</h2> -->
    <div class="board_wrap">
      <div class="board_title">
        <strong>공지사항({{ boardType }}) </strong>
        <p v-if="$store.state.test.loingUserInfo.isLogin">환영합니다. {{ $store.state.test.loingUserInfo.username }}</p>
        <br />
        <p>공지사항을 빠르고 정확하게 안내해드립니다.(게시글 discription)</p>
      </div>
      <div class="board_list_wrap">
        <div class="board_list">
          <div class="top">
            <div class="num">번호</div>
            <div class="title">제목</div>
            <div class="writer">글쓴이</div>
            <div class="date">작성일</div>
            <div class="count">조회수</div>
          </div>
          <div v-for="(boardItem, boardIndex) in board" :key="boardIndex">
            <div class="num">{{ boardItem.boardId }}</div>
            <div class="title">
              <span @click="infoPageBind(boardItem.boardId)">{{ boardItem.title }}</span
              ><span v-if="boardItem.replyCount !== 0" class="replyCount"> ({{ boardItem.replyCount }}) </span>
            </div>
            <div class="writer">{{ boardItem.writer }}</div>
            <div class="date">{{ boardItem.writeDate }}</div>
            <div class="count">{{ boardItem.hits }}</div>
          </div>
        </div>
      </div>
      <!-- <Paging></Paging> -->
      <div class="bt_wrap">
        <!-- <a @click="boardInsert" class="on">등록</a> -->
        <a @click="pageBind" class="on">등록</a>
        <a @click="replyInsert" class="on">댓글등록</a>
        <!-- <a href="#">수정</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Board } from "@/resource/entity";
import common from "../mixin/common";

export default {
  props: {
    boardType: {
      type: String,
      required: false,
      default: "BEST",
    },
  },
  mixins: [common],
  data() {
    return {
      // 게시판 클래스
      board: {
        class: new Board(),
        data: [],
      },
    };
  },
  created() {
    // 게시글 리스트 조회
    this.getBoardList();
  },
  methods: {
    // 등록 파라미터
    insertParam: function () {
      return {
        title: "등록 테스트",
        content: "등록 테스트 중입니다",
        boardType: "BEST",
        writer: "어드민",
        writeDate: new Date().getTime(),
      };
    },
    // 댓글등록 파라미터
    replyInsertParam: function () {
      return {
        // pId: 0,
        content: "등록 테스트 중입니다",
        sort: 0,
        useYn: "Y",
      };
    },
    // 게시글 리스트 조회
    getBoardList: function () {
      this.$axios
        .get("http://localhost:8080/board/boardList", { params: { boardType: this.boardType } })
        .then((result) => {
          if (result.status === 200) {
            console.log(result, "result");
            this.board = { ...result.data };
            console.log(this.board, "this.board");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 게시글 상세 페이지 이동
    // infoPageBind: function (boardId) {
    //   this.$router.push({
    //     name: "boardInfo5",
    //     params: { boardId },
    //   });
    // },
    // 게시글 등록
    // TODO 추후 등록 페이지  추가 필요
    boardInsert: function () {
      console.log(this.insertParam, "this.insertParam");
      this.$axios
        .post("http://localhost:8080/board/boardInsert", this.insertParam())
        .then((result) => {
          if (result.status === 200) {
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 등록 페이지로 이동
    pageBind: function () {
      this.$router.push({
        name: "boardCreate",
      });
    },
    replyInsert: function () {
      console.log(this.replyInsertParam, "this.replyInsertParam");
      this.$axios
        .post("http://localhost:8080/myReply/insertMyReply", this.replyInsertParam())
        .then((result) => {
          if (result.status === 200) {
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
