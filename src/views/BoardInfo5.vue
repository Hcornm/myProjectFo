<template>
  <div>
    <!-- <h2>공지사항</h2> -->
    <div class="board_wrap">
      <!-- 게시판 상세 영역 -->

      <BoardInfoDetail :board="board"></BoardInfoDetail>

      <!-- 댓글 영역-->

      <div class="board_reply_title">
        <p>댓글 {{ loingUserInfo }}</p>
      </div>
      <div class="board_reply_wrap" style="font-size: 20px">
        <div class="board_reply">
          <HmReplyCom5
            v-for="(replyItem, replyIndex) in hmReply.hmReplyList"
            :key="replyIndex"
            :hmReply="replyItem"
            :replyIndex="replyIndex"
            @insertReReply="insertReReply"
            @insertReReReply="insertReReReply"
            @deleteReply="deleteReply"
            @updateReply="updateReply"
          ></HmReplyCom5>

          <div class="board_reply_insert">
            <dl>
              <dt>{{ $store.state.test.loingUserInfo.username || '닉네임' }}</dt>
              <dd>
                <span><a @click="content = ''">취소</a></span
                ><span><a @click="insertReReplyNew">등록</a></span>
                <a @click="userInfo">test</a>
              </dd>
            </dl>
            <dl>
              <dt><textarea v-model="content" placeholder="댓글을 남겨보세요"></textarea></dt>
              <dd></dd>
            </dl>
          </div>
          <!-- 등록 -->
        </div>
      </div>
      <!-- -->
      <!-- 댓글 영역-->
    </div>
  </div>
</template>

<script>
import validate from '@/mixin/validate';
import { Board, Reply } from '@/resource/entity';
import { BoardInfoDetail, HmReplyCom5 } from '@/components/board';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    BoardInfoDetail,
    HmReplyCom5,
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
      umm: '<<',
      ummm: '<',
      // 게시판 클래스
      board: {
        class: new Board(),
        data: [],
      },
      hmReply: {
        class: new Reply(),
        data: [],
      },
      flag: false,
      content: '',
    };
  },
  mixins: [validate],
  created() {
    // 게시판 상세 조회
    this.getBoardInfo();
    // 댓글 리스트 조회
    this.getReplyList();
  },
  computed: {
    // 해당 모듈의 namespaced만 선언해서 불러 올 수 있다.
    // mapGetters는 Vuex 에 내장된 helper 함수이다. 코드를 가독성 있게 해준다.
    // 스프레드 연산자를 통해 선언해야 computed에 다른 메서드들도 선언해서 사용할 수 있음
    ...mapGetters('test', {
      loingUserInfo: 'loingUserInfo',
    }),
    // loginUserInfo() {
    //   return this.$store.getters.loingUserInfo;
    // },
  },
  methods: {
    ...mapMutations('test', {
      userInfo: 'userInfo', // this.userInfo() 메소드 호출 시 this.$store.commit('userInfo') 호출
    }),
    // 객체를 리턴하는 함수를 만들 때 임시 객체를 선언하고 값들을 할당하는 식으로 코드를 작성할 경우 좋지 않다.
    // 타인이 해당 객체에 접근해 값을 바꾸거나 새로운 로직을 추가할 수도 있고 디버깅시 추적이 어렵다.
    // 바로 객체타입으로 리턴해주면 조금 더 직관적이로 클린한 코드가 될 수 있다.

    // 안 좋은예
    // 임시변수를 사용해서 내부에서 로직들을 마음 껏 돌릴 우려가 있고 ex) for문 등 파라미터로 활용하기 위한 객체인데 그 의미가 모호해질 수 있다.
    insertParam2: function () {
      let insertParamObject = {}; // 이것이 임시 변수이며 임시변수의 사용은 지양하는 것이 좋다.
      insertParamObject.boardId = this.boardId;
      insertParamObject.content = this.content;
      insertParamObject.writer = this.$store.state.test.loingUserInfo.username;
      insertParamObject.writeDate = new Date().getTime();
      insertParamObject.parentReplyId = 0;
      insertParamObject.sort = 0;
      insertParamObject.depth = 0;
      insertParamObject.isParent = true;
      insertParamObject.createUserId = this.$store.state.test.loingUserInfo.memberId;

      // 예를 들면 여기서 for문이나 if문을 돌리는 등 이상한 짓을 타인이 할 수가있다.
      // if (insertParamObject.isParent) insertParamObject.writer = 'ㅎㅎㅎ';
      // for (let i = 0; i < ) {

      // }
      return insertParamObject;
    },

    // 좋은 예
    // 임시변수를 사용하지 않고 바로 객체로 리턴해준다.
    // 최상위 부모 등록 파라미터
    insertParam: function () {
      return {
        boardId: this.boardId,
        content: this.content,
        writer: this.$store.state.test.loingUserInfo.username,
        writeDate: new Date().getTime(),
        parentReplyId: 0,
        sort: 0,
        depth: 0,
        isParent: true,
        createUserId: this.$store.state.test.loingUserInfo.memberId,
      };
    },
    // 대댓글 파라미터
    insertReReplyParam: function (replyObj, content) {
      return {
        boardId: this.boardId,
        content: content,
        writer: this.$store.state.test.loingUserInfo.username,
        writeDate: new Date().getTime(),
        parentReplyId: replyObj.hmReplyId,
        sort: 0,
        depth: replyObj.depth + 1,
        isParent: false,
        createUserId: this.$store.state.test.loingUserInfo.memberId,
      };
    },
    // 수정 파라미터
    updateParam: function (replyObj) {
      return {
        hmReplyId: replyObj.hmReplyId,
        content: replyObj.content,
        writer: this.$store.state.test.loingUserInfo.username,
        writeDate: new Date().getTime(),
      };
    },
    // 최상위 부모 댓글 달기
    insertReReplyNew: function () {
      if (!this.isLogin()) {
        return false;
      } else {
        this.$axios
          .post('http://localhost:8080/hmReply/hmReplyInsert', this.insertParam())
          .then((result) => {
            if (result.status === 200) {
              console.log(result);
              this.content = '';
              // 게시판 상세 조회
              this.getBoardInfo();
              // 댓글 리스트 조회
              this.getReplyList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 대댓글 달기
    insertReReply: function (replyObj, content) {
      if (!this.isLogin()) {
        return false;
      } else {
        let params = this.insertReReplyParam(replyObj, content);
        this.$axios
          .post('http://localhost:8080/hmReply/hmReplyInsert', params)
          .then((result) => {
            if (result.status === 200) {
              console.log(result);
              // 게시판 상세 조회
              this.getBoardInfo();
              // 댓글 리스트 조회
              this.getReplyList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    insertReReReply: function (replyObj, content) {
      if (!this.isLogin()) {
        return false;
      } else {
        let params = this.insertReReplyParam(replyObj, content);
        this.$axios
          .post('http://localhost:8080/hmReply/hmReplyInsert', params)
          .then((result) => {
            if (result.status === 200) {
              console.log(result);
              // 게시판 상세 조회
              this.getBoardInfo();
              // 댓글 리스트 조회
              this.getReplyList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 댓글 수정
    updateReply: function (replyObj) {
      let params = this.updateParam(replyObj);
      this.$axios
        .put('http://localhost:8080/hmReply/hmReplyUpdate', params)
        .then((result) => {
          if (result.status === 200) {
            alert('댓글이 수정되었습니다.');
            this.getReplyList();
            console.log(result, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 게시글 상세 조회
    getBoardInfo: function () {
      this.$axios
        .get('http://localhost:8080/board/boardInfo', { params: { boardId: this.boardId } })
        .then((result) => {
          if (result.status === 200) {
            console.log(result, 'result');
            this.board = { ...result.data };
            console.log(this.board, 'this.board');
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
        .get('http://localhost:8080/hmReply/hmReplyList2', { params: { boardId: this.boardId } })
        .then((result) => {
          if (result.status === 200) {
            this.hmReply = { ...result.data };
            this.flag = false;
            console.log(this.hmReply, 'this.hmReply');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 댓글 삭제
    deleteReply: function (hmReplyId) {
      console.log(hmReplyId);
      this.$axios
        .delete(`http://localhost:8080/hmReply/hmReplyDelete/${hmReplyId}`)
        .then((result) => {
          if (result.status === 200) {
            alert('댓글이 삭제되었습니다.');
            this.getReplyList();
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
