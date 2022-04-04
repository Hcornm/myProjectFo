<template>
  <div>
    <div class="board_reply_title">
      <p>댓글</p>
    </div>
    <div class="board_reply_wrap">
      <div class="board_reply">
        <!-- Start v-for -->
        <div v-for="(replyItem, replyIndex) in reply" :key="replyIndex">
          <!-- 댓글 update 포맷 Start -->
          <div v-if="replyObj.sort === replyIndex && replyObj.activeUpdate" class="board_reply_update">
            <dl>
              <dt>{{ replyItem.writer }}</dt>
              <dd><span @click="replyCancel">취소</span><span @click="replyUpdate">등록</span></dd>
            </dl>
            <dl>
              <dt><textarea v-model="replyObj.content" placeholder="댓글을 남겨보세요"></textarea></dt>
              <dd></dd>
            </dl>
          </div>
          <!-- 댓글 update 포맷 End -->
          <!-- 댓글 read 포맷 Start -->
          <!-- depth가 0이면 최상위 댓글 -->
          <div v-else :class="replyItem.depth === 0 ? 'board_reply_info' : `board_reply_info_re${replyItem.depth}`">
            <dl>
              <dt>{{ replyItem.writer }}</dt>
              <dd>
                <a @click="openUpdateBox(replyIndex, replyItem)">수정</a>
                <a @click="replyDelete(replyItem)">삭제</a>
              </dd>
            </dl>
            <dl>
              <dt>{{ replyItem.content }}</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>{{ replyItem.writeDate }}</dt>
              <dd>
                <span @click="openInsertBox(replyIndex, replyItem)">답글쓰기</span>
              </dd>
            </dl>
          </div>
          <!-- 댓글 read 포맷 End -->
          <!-- 대댓글 insert 포맷 Start-->
          <div class="board_reply_insert_re" v-show="replyObj.sort === replyIndex && replyObj.activeReply">
            <dl>
              <dt>닉네임</dt>
              <dd><span @click="replyCancel">취소</span><span @click="replyInsertRe">등록</span></dd>
            </dl>
            <dl>
              <dt><textarea v-model="replyObj.content" placeholder="댓글을 남겨보세요"></textarea></dt>
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
            <dd>
              <span @click="replyInsert">등록</span>
            </dd>
          </dl>
          <dl>
            <dt><textarea v-model="replyObj.content" placeholder="댓글을 남겨보세요"></textarea></dt>
            <dd></dd>
          </dl>
        </div>
        <!-- 댓글 insert 포맷 End -->
      </div>
    </div>
    <!-- 댓글 영역-->
  </div>
</template>
<script>
export default {
  props: {
    reply: {
      type: [Array, Object],
      required: false,
      default: () => [],
    },
    // activeReply: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    // },
    // activeUpdate: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    // },
    // sort: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },
    // realSort: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },
    // depth: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },
    // parentId: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },
    // replyId: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },
    // groupId: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },
    // content: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },
    replyObj: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    // 수정
    replyUpdate: function () {
      this.$emit("replyUpdate");
    },
    // 대댓 등록
    replyInsertRe: function () {
      this.$emit("replyInsertRe");
    },
    // 등록
    replyInsert: function () {
      this.$emit("replyInsert");
    },
    // 등록 취소
    replyCancel: function () {
      this.$emit("replyCancel");
    },
    // 수정 영역 활성화
    openUpdateBox: function (replyIndex, replyItem) {
      this.$emit("openUpdateBox", replyIndex, replyItem);
    },
    // 대댓글 등록 영역 활성화
    openInsertBox: function (replyIndex, replyItem) {
      this.$emit("openInsertBox", replyIndex, replyItem);
    },
    // 댓글 삭제
    replyDelete: function (replyItem) {
      this.$emit("replyDelete", replyItem);
    },
  },
};
</script>
