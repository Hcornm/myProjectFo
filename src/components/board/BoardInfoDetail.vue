<template>
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
</template>
<script>
/**
 * 게시판 상세 페이지 컴포넌트
 */
export default {
  props: {
    board: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
};
</script>
