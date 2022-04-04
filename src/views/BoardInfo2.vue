<template>
  <div>
    <!-- <h2>공지사항</h2> -->
    <div class="board_wrap">
      <!-- 게시판 상세 영역 -->

      <BoardInfoDetail :board="board"></BoardInfoDetail>

      <!-- 댓글 영역-->

      <div class="board_reply_title">
        <p>댓글</p>
      </div>
      <div class="board_reply_wrap" style="font-size: 20px">
        <div class="board_reply">
          <HmReplyCom v-for="(replyItem, replyIndex) in hmReply.hmReplyList" :key="replyIndex" :hmReply="replyItem"></HmReplyCom>

          <div class="board_reply_insert_re" v-show="this.activeReply">
            <dl>
              <dt>닉네임</dt>
              <dd><span>취소</span><span>등록</span></dd>
            </dl>
            <dl>
              <dt><textarea placeholder="댓글을 남겨보세요"></textarea></dt>
              <dd></dd>
            </dl>
          </div>

          <div class="board_reply_insert_re" v-show="this.activeReply">
            <dl>
              <dt>닉네임</dt>
              <dd><span>취소</span><span>등록</span></dd>
            </dl>
            <dl>
              <dt><textarea placeholder="댓글을 남겨보세요"></textarea></dt>
              <dd></dd>
            </dl>
          </div>

          <div class="board_reply_insert">
            <dl>
              <dt>닉네임</dt>
              <dd><span>취소</span><span>등록</span></dd>
            </dl>
            <dl>
              <dt><textarea placeholder="댓글을 남겨보세요"></textarea></dt>
              <dd></dd>
            </dl>
          </div>
        </div>
      </div>
      <!-- -->
      <!-- 댓글 영역-->
    </div>
  </div>
</template>

<script>
import { Board, Reply } from "@/resource/entity";
import { BoardInfoDetail, HmReplyCom } from "@/components/board";

export default {
  components: {
    BoardInfoDetail,
    HmReplyCom,
  },
  props: {
    boardId: {
      type: [Number, String],
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      umm: "<<",
      ummm: "<",
      // 게시판 클래스
      board: {
        class: new Board(),
        data: [],
      },
      hmReply: {
        class: new Reply(),
        data: [],
      },
      sort: 0,
      activeReply: false,
      activeUpdate: false,
      depth: 0,
      parentId: 0,
      replyId: 0,
      groupId: 0,
      content: "",
      // reContent: "",
    };
  },
  created() {
    // 게시판 상세 조회
    this.getBoardInfo();
    // 댓글 리스트 조회
    this.getReplyList();
  },
  methods: {
    computedStyleObject(depth) {
      return {
        depth: depth,
      };
    },
    // 초기화
    initreplyObj: function () {
      return {
        activeReply: false, // 대댓글 영역 활성화
        activeUpdate: false, // 수정 영역 활성화
        sort: 0, // 순번(대댓글 위치용)
        realSort: 0, // 순번 (파마리터용)
        depth: 0, // 뎁스
        parentId: 0, // 부모id
        replyId: 0, // 본인id
        groupId: 0, // 그룹id
        content: "", // 내용
      };
    },
    // 초기화
    // 등록 파라미터
    replyInsertParam: function () {
      return {
        boardId: this.boardId,
        content: this.replyObj.content,
        writer: "어드민",
        writeDate: new Date().getTime(),
        depth: this.replyObj.depth,
        parentId: this.replyObj.parentId,
        groupId: this.replyObj.groupId,
        sort: this.replyObj.realSort,
      };
    },
    // 업데이트 파라미터
    replyUpdateParam: function () {
      return {
        replyId: this.replyObj.replyId,
        content: this.replyObj.content,
        writer: "어드민",
        writeDate: new Date().getTime(),
      };
    },
    // 게시글 상세 조회
    getBoardInfo: function () {
      this.$axios
        .get("http://localhost:8080/board/boardInfo", { params: { boardId: this.boardId } })
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
    // 댓글 리스트 조회
    getReplyList: function () {
      this.$axios
        // .get("http://localhost:8080/reply/replyList", { params: { boardId: this.boardId } })
        .get("http://localhost:8080/hmReply/hmReplyList2", { params: { boardId: this.boardId } })
        .then((result) => {
          if (result.status === 200) {
            this.hmReply = { ...result.data };
            console.log(this.hmReply, "this.hmReply");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 댓글 등록
    replyInsert: function () {
      this.replyObj.groupId = 0;
      this.replyObj.depth = 0;
      this.replyObj.parentId = 0;
      this.replyObj.realSort = this.replyObj.realSort === 0 ? 0 : this.replyObj.realSort + 1;
      this.$axios
        .post("http://localhost:8080/reply/replyInsert", this.replyInsertParam())
        .then((result) => {
          if (result.status === 200) {
            this.replyObj = this.initreplyObj();
            this.getReplyList();
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 대댓글 등록
    replyInsertRe: function () {
      this.replyObj.realSort = this.replyObj.realSort === 0 ? 1 : this.replyObj.realSort + 1;
      this.$axios
        .post("http://localhost:8080/reply/replyInsert", this.replyInsertParam())
        .then((result) => {
          if (result.status === 200) {
            this.replyObj = this.initreplyObj();
            this.getReplyList();
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 댓글 삭제
    replyDelete: function (replyItem) {
      console.log("dasdas");
      this.$axios
        .delete(`http://localhost:8080/reply/replyDelete/${replyItem.replyId}`)
        .then((result) => {
          if (result.status === 200) {
            alert("댓글이 삭제되었습니다.");
            this.getReplyList();
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 댓글 수정
    replyUpdate: function () {
      console.log(this.replyUpdateParam(), "replyUpdateParam");
      this.$axios
        .put("http://localhost:8080/reply/replyUpdate", this.replyUpdateParam())
        .then((result) => {
          if (result.status === 200) {
            this.replyObj = this.initreplyObj();
            this.getReplyList();
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 댓글 등록 영역 활성화
    openInsertBox: function (replyIndex, replyItem) {
      this.replyObj.activeUpdate = false;
      this.replyObj.activeReply = true;
      this.replyObj.content = "";
      this.replyObj.sort = replyIndex;
      this.replyObj.depth = replyItem.depth + 1;
      this.replyObj.groupId = replyItem.groupId;
      this.replyObj.parentId = replyItem.replyId;
      this.replyObj.realSort = replyItem.sort;
    },
    // 수정 영역 활성화
    openUpdateBox: function (replyIndex, replyItem) {
      this.replyObj.activeReply = false;
      this.replyObj.activeUpdate = true;
      this.replyObj.content = replyItem.content;
      this.replyObj.sort = replyIndex;
      this.replyObj.replyId = replyItem.replyId;
    },
    // 댓글 취소
    replyCancel: function () {
      this.replyObj.sort = 0;
      this.replyObj.content = "";
      this.replyObj.activeUpdate = false;
      this.replyObj.activeReply = false;
    },
  },
};
</script>
