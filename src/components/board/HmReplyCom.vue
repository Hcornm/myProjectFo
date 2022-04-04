<template>
  <div>
    <div class="board_reply_info">
      <!-- 루트 -->
      <div>
        <dl>
          <dt>{{ hmReply.writer }} {{ test }}</dt>
          <dd><a>수정</a><a>삭제</a></dd>
        </dl>
        <dl>
          <dt>{{ hmReply.content }}</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>{{ hmReply.writeDate }}</dt>
          <dd>답글쓰기</dd>
        </dl>
      </div>
      <!-- 루트 -->
      <!-- 서브 -->
      <!-- <div v-show="hmReply.subMenu.length"> -->
      <div v-for="(subItem, subIndex) in hmReply.subMenu" :key="subIndex" class="board_reply_info_re">
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
          <dd>답글쓰기</dd>
        </dl>
        <HmReplyReCom v-for="(reSubItem, reSubIndex) in subItem.subMenu" :key="reSubIndex" :reply="reSubItem"></HmReplyReCom>
        <!-- 서브 안-->
        <!-- <div v-for="(subsItem, subsIndex) in subItem.subMenu" :key="subsIndex" class="board_reply_info">
            <dl>
              <dt>{{ subsItem.writer }}</dt>
              <dd><a>수정</a><a>삭제</a></dd>
            </dl>
            <dl>
              <dt>{{ subsItem.content }}</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>{{ subsItem.writeDate }}</dt>
              <dd>답글쓰기</dd>
            </dl>
          </div> -->
        <!--서브 안 -->
        <!-- </div> -->
      </div>
      <!-- 서브 -->
    </div>
    <!-- <HmReplyCom v-for="(reSubItem, reSubIndex) in hmReply.subMenu" :key="reSubIndex" :hmReply="reSubItem"></HmReplyCom> -->
  </div>
</template>
<script>
import HmReplyReCom from "../board/HmReplyReCom.vue";
export default {
  components: {
    HmReplyReCom,
  },
  props: {
    hmReply: {
      type: Object,
      default: () => [],
      required: true,
    },
    test: {
      type: String,
    },
  },
};
</script>
