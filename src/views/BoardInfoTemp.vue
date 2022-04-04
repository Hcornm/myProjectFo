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
      <div class="board_reply_wrap">
        <div class="board_reply">
          <!-- Start v-for -->
          <div v-for="(replyItem, replyIndex) in reply" :key="replyIndex">
            <!-- 댓글 update 포맷 Start -->
            <div v-if="sort === replyIndex && activeUpdate" class="board_reply_update">
              <dl>
                <dt>{{ replyItem.writer }}</dt>
                <dd><span @click="replyCancel">취소</span><span @click="replyUpdate(replyItem)">등록</span></dd>
              </dl>
              <dl>
                <dt><textarea v-model="content" placeholder="댓글을 남겨보세요"></textarea></dt>
                <dd></dd>
              </dl>
            </div>
            <!-- 댓글 update 포맷 End -->
            <!-- 댓글 read 포맷 Start -->
            <!-- depth가 0이면 최상위 댓글 -->
            <div v-else :class="replyItem.depth === 0 ? 'board_reply_info' : `board_reply_info_re${replyItem.depth}`">
              <dl>
                <dt>{{ replyItem.writer }}</dt>
                <dd><a @click="openUpdateBox(replyIndex, replyItem)">수정</a><a @click="replyDelete(replyItem)">삭제</a></dd>
              </dl>
              <dl>
                <dt>{{ replyItem.content }}</dt>
                <dd></dd>
              </dl>
              <dl>
                <dt>{{ replyItem.writeDate }}</dt>
                <dd><span @click="openInsertBox(replyIndex, replyItem)">답글쓰기</span></dd>
              </dl>
            </div>
            <!-- 댓글 read 포맷 End -->
            <!-- 대댓글 insert 포맷 Start-->
            <div class="board_reply_insert_re" v-show="sort === replyIndex && activeReply">
              <dl>
                <dt>닉네임</dt>
                <dd><span @click="replyCancel">취소</span><span @click="replyInsertRe">등록</span></dd>
              </dl>
              <dl>
                <dt><textarea v-model="content" placeholder="댓글을 남겨보세요"></textarea></dt>
                <dd></dd>
              </dl>
            </div>
            <!-- 대댓글 insert 포맷 End-->
          </div>
          <!-- End v-for -->
          <!-- 댓글 insert 포맷 Start -->
          <div class="board_reply_insert">
            <dl>
              <dt>닉네임</dt>
              <dd><span @click="replyInsert">등록</span></dd>
            </dl>
            <dl>
              <dt><textarea v-model="content" placeholder="댓글을 남겨보세요"></textarea></dt>
              <dd></dd>
            </dl>
          </div>
          <!-- 댓글 insert 포맷 End -->
        </div>
      </div>
      <!-- 댓글 영역-->
    </div>
  </div>
</template>

<script>
import { Board, Reply } from "@/resource/entity";
import { BoardInfoDetail } from "@/components/board";
export default {
  components: {
    BoardInfoDetail,
  },

  props: {
    boardId: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      umm: "<<",
      ummm: "<",
      // 데이터 파싱 작업 필요
      // 게시판 클래스
      board: {
        class: new Board(),
        data: [],
      },
      // 댓글 클래스
      reply: {
        class: new Reply(),
        data: [],
      },
      // 대댓글 영역 활성화
      activeReply: false,
      // 수정 영역 활성화
      activeUpdate: false,
      // 순번(대댓글 위치용)
      sort: 0,
      // 순번 (파마리터용)
      realSort: 0,
      // 뎁스
      depth: 0,
      // 부모id
      parentId: 0,
      // 본인id
      replyId: 0,
      // 그룹id
      groupId: 0,
      // 내용
      content: "",
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
    initParma: function () {
      this.sort = 0;
      this.activeReply = false;
      this.activeUpdate = false;
      this.depth = 0;
      this.parentId = 0;
      this.replyId = 0;
      this.groupId = 0;
      this.content = "";
      this.realSort = 0;
    },
    // 등록 파라미터
    replyInsertParam: function () {
      return {
        boardId: this.boardId,
        content: this.content,
        writer: "어드민",
        writeDate: new Date().getTime(),
        depth: this.depth,
        parentId: this.parentId,
        groupId: this.groupId,
        sort: this.realSort,
      };
    },
    // 업데이트 파라미터
    replyUpdateParam: function () {
      return {
        replyId: this.replyId,
        content: this.content,
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
        .get("http://localhost:8080/reply/replyList", { params: { boardId: this.boardId } })
        // .get("http://localhost:8080/hmReply/hmReplyList", { params: { boardId: this.boardId } })
        .then((result) => {
          if (result.status === 200) {
            this.reply = { ...result.data };
            console.log(this.reply, "this.reply");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 댓글 등록
    replyInsert: function () {
      this.groupId = 0;
      this.depth = 0;
      this.parentId = 0;
      this.realSort = this.realSort === 0 ? 0 : this.realSort + 1;
      this.$axios
        .post("http://localhost:8080/reply/replyInsert", this.replyInsertParam())
        .then((result) => {
          if (result.status === 200) {
            this.initParma();
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
      this.realSort = this.realSort === 0 ? 1 : this.realSort + 1;
      this.$axios
        .post("http://localhost:8080/reply/replyInsert", this.replyInsertParam())
        .then((result) => {
          if (result.status === 200) {
            this.initParma();
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
            this.initParma();
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
      this.activeUpdate = false;
      this.activeReply = true;
      this.content = "";
      this.sort = replyIndex;
      this.depth = replyItem.depth + 1;
      this.groupId = replyItem.groupId;
      this.parentId = replyItem.replyId;
      this.realSort = replyItem.sort;
    },
    // 수정 영역 활성화
    openUpdateBox: function (replyIndex, replyItem) {
      this.activeReply = false;
      this.activeUpdate = true;
      this.content = replyItem.content;
      this.sort = replyIndex;
      this.replyId = replyItem.replyId;
    },
    // 댓글 취소
    replyCancel: function () {
      this.sort = 0;
      this.content = "";
      this.activeUpdate = false;
      this.activeReply = false;
    },
  },
};
</script>
