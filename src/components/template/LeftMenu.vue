<template>
  <div>
    <div class="leftMenu_wrap">
      <div class="leftMenu_title">
        <div>
          <div class="leftMenu_cafeInfo"><a @click="is = 'cafeInfo'">카페정보</a></div>
          <div class="leftMenu_userInfo"><a @click="is = 'userInfo'">나의활동</a></div>
        </div>
      </div>
      <!-- cafeInfo, userInfo 나중에 다이나믹 컴포넌트화 해야함-->
      <div v-if="is === 'cafeInfo'" class="leftMenu_list_wrap">
        <div class="leftMenu_list">
          <div class="top">
            <div class="key">회원수</div>
            <div class="value">{{ comma(18820004) }}명</div>
          </div>
          <div>
            <div class="key">즐겨찾는 멤버</div>
            <div class="value">{{ comma(3560023) }}명</div>
          </div>
          <div>
            <div class="key">게시판 구독수</div>
            <div class="value">{{ comma(23525) }}회</div>
          </div>
          <div>
            <div class="key">우리카페앱 수</div>
            <div class="value">{{ comma(21412) }}회</div>
          </div>
        </div>
      </div>
      <div v-else class="leftMenu_list_wrap">
        <div class="leftMenu_list">
          <div class="top">
            <div class="key">방문</div>
            <div class="value">{{ comma(75) }}회</div>
          </div>
          <div>
            <div class="key">내가 쓴 글 보기</div>
            <div class="value">
              <a>{{ comma(1) }}개</a>
            </div>
          </div>
          <div>
            <div class="key">내가 쓴 댓글 보기</div>
            <div class="value">
              <a>{{ comma(1) }}개</a>
            </div>
          </div>
        </div>
      </div>
      <!-- cafeInfo, userInfo 나중에 다이나믹 컴포넌트화 해야함-->
      <div class="leftMenu_category">
        <div>
          <div class="key">주제</div>
          <div class="value">생활 > 중고용품</div>
        </div>
      </div>
      <div class="leftMenu_btn_wrap">
        <div>
          <a class="on">카페 글쓰기</a>
        </div>
      </div>
      <div class="leftMenu_category_list">
        <div>
          <div class="key">전체글보기</div>
          <div class="value"><a @click="boardListBind('')">전체글보기</a></div>
        </div>
        <div>
          <div class="key">★ 인기글보기</div>

          <div class="value"><a @click="boardListBind('Free')">자유게시판</a></div>
          <div class="value"><a @click="boardListBind('Question')">질문게시판</a></div>
          <div class="value"><a @click="boardListBind('Notice')">공지사항</a></div>
          <div class="value"><a @click="boardListBind('Best')">베스트</a></div>
        </div>
        <div>
          <div class="key">★ 공지사항</div>
          <div class="value">공지사항</div>
          <div class="value">이용정책</div>
          <div class="value">사기예방</div>
        </div>
        <div>
          <div class="key">★ 신고하기/문의하기</div>
          <div class="value">카페 1:1 고객센터</div>
          <div class="value">중고나라 광고 문의하기</div>
          <div class="value">실시간 사기 제보 새 게시글</div>
          <div class="value">※ 사기 제보 전 필독!!</div>
        </div>
        <div>
          <div class="key">★ 중나 파트너사 신청</div>
          <div class="value">통합 파트너사 신청</div>
          <div class="value">모바일 파트너사 신청</div>
          <div class="value">식품 파트너사 신청</div>
        </div>
        <div>
          <div class="key">★ 중나 이용팁</div>
          <div class="value">슬기로운 중나생활정보</div>
          <div class="value">중고나라 공식 블로그</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import common from "@/mixin/common";
export default {
  data() {
    return {
      is: "cafeInfo",
    };
  },
  mixins: [common],
  methods: {
    // boardListBind: function (value) {
    //   this.$router.push({
    //     name: `boardList${value}`,
    //     params: { boardType: value },
    //   });
    // },
  },
};
</script>
