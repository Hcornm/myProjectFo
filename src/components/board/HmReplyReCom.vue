<template>
  <div>
    <!-- <div class="board_reply_info_re"> -->
    <div class="board_reply_info_re">
      <dl>
        <dt>{{ reply.writer }}</dt>
        <dd><a @click="asd">수정</a><a>삭제</a></dd>
      </dl>
      <dl>
        <dt>{{ reply.content }}</dt>
        <dd></dd>
      </dl>
      <dl>
        <dt>{{ reply.writeDate }}</dt>
        <dd @click="insertReReReply()">답글쓰기</dd>
      </dl>
    </div>
    <!-- <div v-for="(subItem, subIndex) in reply.childReply" :key="subIndex" class="board_reply_info"> -->
    <div v-for="(subItem, subIndex) in reply.childReply" :key="subIndex" class="board_reply_info_re">
      <dl>
        <dt>{{ subItem.writer }}</dt>
        <dd><a @click="asd">수정</a><a @click="asd">삭제</a></dd>
      </dl>
      <dl>
        <dt>{{ subItem.content }}</dt>
        <dd></dd>
      </dl>
      <dl>
        <dt>{{ subItem.writeDate }}</dt>
        <dd @click="insertReReReReply(subItem)">답글쓰기</dd>
      </dl>
      <!-- <HmReplyCom v-for="(reSubItem, reSubIndex) in subItem.childReply" :key="reSubIndex" :reply="reSubItem"></HmReplyCom> -->
      <hm-reply-re-com v-for="(reSubItem, reSubIndex) in subItem.childReply" :key="reSubIndex" :reply="reSubItem"></hm-reply-re-com>
    </div>
  </div>
</template>
<script>
// import HmReplyReCom from "./HmReplyReCom.vue";
export default {
  name: "hm-reply-re-com",
  components: {
    // HmReplyReCom,
  },
  props: {
    reply: {
      type: Object,
      required: true,
    },
  },
  methods: {
    asd: function () {
      alert("asdsa");
    },
    insertReReReply: function () {
      this.$emit("insertReReReply", this.reply);
    },
    insertReReReReply: function (replyItem) {
      this.$emit("insertReReReply", replyItem);
    },
  },
};
</script>
