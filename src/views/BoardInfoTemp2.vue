<template>
  <div>
    <!-- <h2>공지사항</h2> -->
    <div class="board_wrap">
      <div class="board_info_wrap">
        <div class="board_info">
          <div class="title">{{ board.title }}</div>
          <div class="info">
            <dl>
              <dt>번호</dt>
              <dd>{{ board.boardId }}</dd>
            </dl>
            <dl>
              <dt>글쓴이</dt>
              <dd>{{ board.writer }}</dd>
            </dl>
            <dl>
              <dt>작성일</dt>
              <dd>{{ board.writeDate }}</dd>
            </dl>
            <dl>
              <dt>조회수</dt>
              <dd>{{ board.hits }}</dd>
            </dl>
          </div>
          <div class="cont">
            {{ board.content }}
          </div>
        </div>
        <!-- 버튼 영역-->
        <div class="bt_wrap">
          <!-- <a href="#" class="on">목록</a>
          <a href="#">수정</a> -->
        </div>
      </div>

      <!--     
      <div class="board_reply_title">
        <p>댓글</p>
      </div>
      <div class="board_reply_wrap">
        <div class="board_reply">
          <div class="board_reply_info">
            <dl>
              <dt>닉네임</dt>
              <dd><a>수정</a><a>삭제</a></dd>
            </dl>
            <dl>
              <dt>내용내용내용내용내용내용</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>2021-01-16</dt>
              <dd>답글쓰기</dd>
            </dl>
          </div>
     
          <div class="board_reply_info_re">
            <dl>
              <dt>닉네임</dt>
              <dd><a>수정</a><a>삭제</a></dd>
            </dl>
            <dl>
              <dt>내용내용내용내용내용내용</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>2021-01-16</dt>
              <dd><span @click="test">답글쓰기</span></dd>
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
    
          <div class="board_reply_info">
            <dl>
              <dt>닉네임</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>내용내용내용내용내용내용</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>2021-01-16</dt>
              <dd>답글쓰기</dd>
            </dl>
          </div>
          <div class="board_reply_info">
            <dl>
              <dt>닉네임</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>내용내용내용내용내용내용</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>2021-01-16</dt>
              <dd>답글쓰기</dd>
            </dl>
          </div>
     
          <div class="board_reply_insert_re" v-show="this.activeReply">
            <dl>
              <dt>닉네임</dt>
              <dd><span>취소</span><span @click="replyInsert(replyId)">등록</span></dd>
            </dl>
            <dl>
              <dt><textarea placeholder="댓글을 남겨보세요"></textarea></dt>
              <dd></dd>
            </dl>
          </div>
         
          <div class="board_reply_info">
            <dl>
              <dt>닉네임</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>내용내용내용내용내용내용</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>2021-01-16</dt>
              <dd><a>답글쓰기</a></dd>
            </dl>
          </div>

      
          <div class="board_reply_insert">
            <dl>
              <dt>닉네임</dt>
              <dd><span>취소</span><span @click="replyInsert">등록</span></dd>
            </dl>
            <dl>
              <dt><textarea placeholder="댓글을 남겨보세요"></textarea></dt>
              <dd></dd>
            </dl>
          </div>
     
        </div>
      </div> -->

      <!-- 댓글 영역-->
      <div class="board_reply_title">
        <p>댓글</p>
      </div>
      <div class="board_reply_wrap">
        <div class="board_reply">
          <div v-for="(replyItem, replyIndex) in reply" :key="replyIndex">
            <div :class="replyItem.depth === 0 ? 'board_reply_info' : 'board_reply_info_re'">
              <dl>
                <dt>{{ replyItem.writer }}</dt>
                <dd><a>수정</a><a @click="replyDelete(replyItem)">삭제</a></dd>
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

            <div class="board_reply_insert_re" v-show="sort === replyIndex && activeReply">
              <dl>
                <dt>닉네임</dt>
                <dd><span>취소</span><span @click="replyInsertRe">등록</span></dd>
              </dl>
              <dl>
                <dt><textarea v-model="content" placeholder="댓글을 남겨보세요"></textarea></dt>
                <dd></dd>
              </dl>
            </div>
          </div>

          <!-- 댓글 작성창-->
          <div class="board_reply_insert">
            <dl>
              <dt>닉네임</dt>
              <dd><span>취소</span><span @click="replyInsert">등록</span></dd>
            </dl>
            <dl>
              <dt><textarea v-model="content" placeholder="댓글을 남겨보세요"></textarea></dt>
              <dd></dd>
            </dl>
          </div>
          <!-- 댓글 작성창-->
        </div>
      </div>
      <!-- 댓글 영역-->
    </div>
  </div>
</template>

<script>
import { Board, Reply } from "@/resource/entity";

export default {
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
      // 게시판 클래스
      board: {
        class: new Board(),
        data: [],
      },
      reply: {
        class: new Reply(),
        data: [],
      },
      sort: 0,
      activeReply: false,
      depth: 0,
      parentId: 0,
      groupId: 0,
      content: "",
      // reContent: "",
    };
  },
  created() {
    this.getBoardInfo();
    this.getReplyList();
  },
  methods: {
    replyInsertParam: function () {
      return {
        boardId: this.boardId,
        content: this.content,
        writer: "어드민",
        writeDate: new Date().getTime(),
        depth: this.depth,
        parentId: this.parentId,
        groupId: this.groupId,
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
            console.log(this.board.class, "this.board");
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
    // 댓글 작성
    replyInsert: function () {
      this.groupId = 0;
      this.depth = 0;
      this.parentId = 0;
      console.log(this.replyInsertParam(), "this.reply.class.replyInserParam()");
      this.$axios
        .post("http://localhost:8080/reply/replyInsert", this.replyInsertParam())
        .then((result) => {
          if (result.status === 200) {
            this.getReplyList();
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 댓글 작성
    replyInsertRe: function () {
      console.log(this.replyInsertParam(), "this.reply.class.replyInserParam()");
      this.$axios
        .post("http://localhost:8080/reply/replyInsert", this.replyInsertParam())
        .then((result) => {
          if (result.status === 200) {
            this.getReplyList();
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    replyDelete: function (replyItem) {
      this.$axios
        .delete(`http://localhost:8080/reply/replyDelete/${replyItem.replyId}`)
        .then((result) => {
          if (result.status === 200) {
            this.getReplyList();
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openInsertBox: function (replyIndex, replyItem) {
      // this.activeReply = this.activeReply === true ? false : true;
      this.activeReply = true;
      this.content = "";
      this.sort = replyIndex;
      this.depth = replyItem.depth + 1;
      this.groupId = replyItem.groupId;
      this.parentId = replyItem.replyId;

      //   this.activeReply = this.activeReply === true ? false : true;
      //   console.log(this.activeReply);
    },
  },
};
</script>
