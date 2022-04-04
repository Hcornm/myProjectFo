<template>
  <div>
    <div v-for="(subItem, subIndex) in hmReply.childReply" :key="subIndex">
      <div class="board_reply_info_re">
        <!-- <div> -->
        <dl>
          <dt>{{ subItem.writer }}</dt>
          <dd><a>수정</a><a>삭제</a></dd>
        </dl>
        <dl>
          <dt>{{ subItem.content }}</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>{{ subItem.writeDate }}</dt>
          <dd>답글쓰기 페어런츠</dd>
        </dl>
      </div>
      <hm-reply-re-com4 v-for="(reSubItem, reSubIndex) in subItem.childReply" :key="reSubIndex" :reply="reSubItem"></hm-reply-re-com4>
    </div>
  </div>
</template>
<script>
// import HmReplyCom4 from "./HmReplyCom4.vue";
// import HmReplyReCom4 from "./HmReplyReCom4.vue";

export default {
  name: "hm-reply-re-com4",
  components: {
    // HmReplyCom4,
    // HmReplyReCom,
    // HmReplyReCom4,
  },
  props: {
    hmReply: {
      type: [Object, Array],
      default: () => [],
      required: true,
    },
    methods: {
      // test: function () {
      //   alert("test");
      // },
    },
  },
};
</script>
