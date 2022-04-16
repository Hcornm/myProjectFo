<template>
  <div>
    <div>
      <!-- 루트 -->
      <!-- <div class="board_reply_info" v-if="hmReply.parentHmReply === null"> -->
      <!-- 댓글 수정하기 -->
      <div v-if="activeUpdate.flag === true && activeUpdate.hmReplyId === hmReply.hmReplyId" class="board_reply_update">
        <dl>
          <dt>{{ hmReply.writer }}</dt>
          <dd>
            <span><a @click="cancelUpdate">취소</a></span
            ><span><a @click="updateReply()">등록</a></span>
          </dd>
        </dl>
        <dl>
          <dt><textarea v-model="hmReply.content" placeholder="댓글을 남겨보세요"></textarea></dt>
          <dd></dd>
        </dl>
      </div>
      <!-- 뎁스를 추가해서 class board_reply_info_re{depth}를 해줘야 할 듯;;... -->
      <div v-else :class="hmReply.parentHmReply === null ? 'board_reply_info' : `board_reply_info_re${hmReply.depth}`">
        <!-- <div v-if="activeUpdate.flag === false" :class="hmReply.parentHmReply === null ? 'board_reply_info' : `board_reply_info_re${hmReply.depth}`"> -->
        <dl>
          <dt>{{ hmReply.writer }}</dt>
          <dd><a @click="updateFlag">수정</a><a @click="deleteReply()">삭제</a></dd>
        </dl>
        <dl>
          <dt>{{ hmReply.content }}</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>{{ hmReply.writeDate }}</dt>
          <dd><a @click="insertFlag">답글쓰기</a></dd>
        </dl>
      </div>
      <!--답글 작성 영역 -->
      <div class="board_reply_insert_re" v-show="activeReply.flag === true && activeReply.hmReplyId === hmReply.hmReplyId">
        <dl>
          <dt>답글 작성 영역</dt>
          <dd>
            <span><a @click="initActiveReply">취소</a></span
            ><span><a @click="insertReReply(hmReply, content)">등록</a></span>
          </dd>
        </dl>
        <dl>
          <dt><textarea v-model="content" placeholder="댓글을 남겨보세요"></textarea></dt>
          <dd></dd>
        </dl>
      </div>
      <!-- 루트 -->
      <!-- 대댓글 영역 -->
      <div v-for="(subItem, subIndex) in hmReply.childReply" :key="subIndex">
        <!-- 대댓글 수정 영역 -->
        <div v-if="activeUpdate.flag === true && activeUpdate.hmReplyId === subItem.hmReplyId" class="board_reply_update">
          <dl>
            <dt>{{ subItem.writer }}</dt>
            <dd>
              <span><a @click="cancelUpdate">취소</a></span
              ><span><a @click="updateReply(subItem)">등록</a></span>
            </dd>
          </dl>
          <dl>
            <dt><textarea v-model="subItem.content" placeholder="댓글을 남겨보세요"></textarea></dt>
            <dd></dd>
          </dl>
        </div>
        <!-- <div :class="`board_reply_info_re${subIndex + 1}`"> -->
        <div v-else :class="`board_reply_info_re${subItem.depth}`">
          <!-- <div v-if="activeUpdate.flag === false" :class="`board_reply_info_re${subItem.depth}`"> -->
          <dl>
            <dt>{{ subItem.writer }}</dt>
            <dd><a @click="updateFlagRe(subItem)">수정</a><a @click="deleteReply(subItem.hmReplyId)">삭제</a></dd>
          </dl>
          <dl>
            <dt>{{ subItem.content }}</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>{{ subItem.writeDate }}</dt>
            <!-- <dd @click="insertReReReReplyy(subItem)">답글쓰기5</dd> -->
            <dd @click="insertFlagRe(subItem)">답글쓰기</dd>
          </dl>
        </div>
        <!-- 대댓글 답변 영역 플래그가 true이고 hmReplyId가 같은 것만 화면에 뿌려준다.-->
        <div class="board_reply_insert_re" v-show="activeReply.flag === true && activeReply.hmReplyId === subItem.hmReplyId">
          <dl>
            <dt>대댓글 답변 영역</dt>
            <dd>
              <span><a @click="initActiveReply">취소</a></span
              ><span><a @click="insertReReReply(subItem)">등록</a></span>
            </dd>
          </dl>
          <dl>
            <dt><textarea v-model="content" placeholder="댓글을 남겨보세요"></textarea></dt>
            <dd></dd>
          </dl>
        </div>

        <!-- 재귀 호출 -->
        <!--@insertReply="insertReply"-->
        <hm-reply-com
          v-for="(reSubItem, reSubIndex) in subItem.childReply"
          :key="reSubIndex"
          :hmReply="reSubItem"
          @updateReply="updateReply"
          @deleteReply="deleteReply"
          @insertReReply="insertReReply"
          @insertReReReply="insertReReReply"
        ></hm-reply-com>
        <!-- <HmReplyReCom5 v-for="(reSubItem, reSubIndex) in hmReply.childReply" :key="reSubIndex" :reply="reSubItem" class="board_reply_info_re" @insertReReReply="insertReReReply"></HmReplyReCom5> -->
      </div>

      <!-- <HmReplyReCom4 v-for="(reSubItem, reSubIndex) in hmReply.subMenu" :key="reSubIndex" :hmReply="reSubItem"></HmReplyReCom4> -->
    </div>
  </div>
</template>
<script>
// import HmReplyReCom5 from "./HmReplyReCom5.vue";
import validate from '@/mixin/validate';
export default {
  // 자기 자신을 호출할려면 컴포넌트 선언이 아닌 name으로 선언
  name: 'hm-reply-com',
  components: {
    // HmReplyReCom,
    // HmReplyReCom5,
  },
  props: {
    hmReply: {
      type: Object,
      default: () => [],
      required: true,
    },
    replyIndex: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  data() {
    return {
      activeReply: {
        hmReplyId: 0,
        flag: false,
      },
      activeUpdate: {
        hmReplyId: 0,
        flag: false,
      },
      content: '',
    };
  },
  mixins: [validate],
  methods: {
    // 초기화
    init: function () {
      this.initActiveReply();
      this.initActiveUpdate();
    },
    // 대댓글 작성 플래그 초기화
    initActiveReply: function () {
      this.activeReply.hmReplyId = 0;
      this.activeReply.flag = false;
      this.content = '';
    },
    // 업데이트 플레그 초기화
    initActiveUpdate: function () {
      this.activeUpdate.hmReplyId = 0;
      this.activeUpdate.flag = false;
      this.content = '';
    },
    // 댓글 수정창 열기
    updateFlag: function () {
      if (!this.isCreateUserCheck(this.hmReply.createUserId, '수정')) {
        return false;
      } else {
        this.initActiveReply();
        this.activeUpdate.hmReplyId = this.hmReply.hmReplyId;
        this.activeUpdate.flag = true;
      }
    },
    // 대댓글 수정창 열기
    updateFlagRe: function (subItem) {
      if (!this.isCreateUserCheck(subItem.createUserId, '수정')) {
        return false;
      } else {
        this.initActiveReply();
        this.activeUpdate.hmReplyId = subItem.hmReplyId;
        this.activeUpdate.flag = true;
      }
    },
    // 수정창 닫기
    cancelUpdate: function () {
      this.initActiveUpdate();
    },
    // 댓글 수정
    updateReply: function (subItem) {
      if (subItem !== undefined) {
        this.$emit('updateReply', subItem);
      } else {
        this.$emit('updateReply', this.hmReply);
      }
      this.init();
    },
    // 댓글 삭제
    deleteReply: function (hmReplyId) {
      if (hmReplyId !== undefined) {
        this.$emit('deleteReply', hmReplyId);
      } else {
        this.$emit('deleteReply', this.hmReply.hmReplyId);
      }
      this.init();
    },
    // 댓글 작성
    insertReReply: function (hmReply, content) {
      this.$emit('insertReReply', hmReply, content);
      this.init();
    },
    // 대댓글 작성
    insertReReReply: function (subItem) {
      this.$emit('insertReReReply', subItem, this.content);
      this.init();
    },
    // 댓글 작성창 열기
    insertFlag: function () {
      this.initActiveUpdate();
      this.activeReply.flag = true;
      this.activeReply.hmReplyId = this.hmReply.hmReplyId;
      // this.$emit("insertReReply", this.hmReply);
    },
    // 대댓글 작성창 열기
    insertFlagRe: function (subItem) {
      console.log(subItem.hmReplyId);
      console.log(this.activeReply);
      this.initActiveUpdate();
      this.activeReply.hmReplyId = subItem.hmReplyId;
      this.activeReply.flag = true;
      console.log(this.activeReply);
    },
    // insertReReply: function (depth) {
    //   console.log(depth, "1");
    //   console.log(depth);
    //   this.$emit("insertReReply", this.hmReply, this.content, depth);
    //   this.content = "";
    //   // this.activeReply = false;
    //   this.init();
    // },
    // insertReReReply: function (hmReply) {
    //   console.log("2");
    //   this.$emit("insertReReReReplyy", hmReply);
    //   this.init();
    // },
    // insertReReReReplyy: function (subItem) {
    //   console.log(subItem);
    //   this.$emit("insertReReReReplyy", subItem);
    //   this.init();
    // },
  },
};
</script>
