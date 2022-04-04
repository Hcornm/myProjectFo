<template>
  <div>
    <div>
      <!-- 루트 -->
      <div class="board_reply_info">
        <!-- <div> -->
        <dl>
          <dt>{{ hmReply.writer }}</dt>
          <dd><a>수정</a><a @click="deleteReReReply">삭제</a></dd>
        </dl>
        <dl>
          <dt>{{ hmReply.content }}</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>{{ hmReply.writeDate }}</dt>
          <dd><a @click="insertReReply">답글쓰기</a></dd>
        </dl>
      </div>
      <HmReplyReCom4 v-for="(reSubItem, reSubIndex) in hmReply.childReply" :key="reSubIndex" :reply="reSubItem" class="board_reply_info_re" @insertReReReply="insertReReReply"></HmReplyReCom4>
      <!-- <HmReplyReCom4 v-for="(reSubItem, reSubIndex) in hmReply.subMenu" :key="reSubIndex" :hmReply="reSubItem"></HmReplyReCom4> -->
    </div>
  </div>
</template>
<script>
import HmReplyReCom4 from "./HmReplyReCom4.vue";
export default {
  components: {
    // HmReplyReCom,
    HmReplyReCom4,
  },
  props: {
    hmReply: {
      type: Object,
      default: () => [],
      required: true,
    },
    // test: {
    //   type: String,
    // },
  },
  methods: {
    insertReReply: function () {
      this.$emit("insertReReply", this.hmReply);
    },
    insertReReReply: function (hmReply) {
      this.$emit("insertReReply", hmReply);
    },
    // 댓글 삭제
    deleteReReReply: function () {
      this.$emit("deleteReReReply", this.hmReply);
    },
  },
};
</script>
