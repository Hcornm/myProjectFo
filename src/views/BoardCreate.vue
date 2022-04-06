<template>
  <div>
    <div class="board_wrap">
      <div class="board_title">
        <strong>글작성</strong>
        <p>공지사항을 빠르고 정확하게 안내해드립니다.(게시글 discription)</p>
      </div>
      <!-- 글작성 게시판 body -->
      <div class="board_create_wrap">
        <div class="board_create">
          dsadasdas
          <input multiple @change="onInputFile" type="file" id="file" class="inputfile" />
          <div @click="uploadFile">전송</div>
        </div>
      </div>
      <!-- 글작성 게시판 body -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: "",
    };
  },
  created() {},
  methods: {
    onInputFile: function (e) {
      var file = e.target.files;
      let url = URL.createObjectURL(file[0]);
      this.image = url;
      console.log(file, "file");
      console.log(url, "url");
      console.log(this.image, "image");

      this.$axios
        .post("http://localhost:8080/board/fileUpdate", file)
        .then((result) => {
          if (result.status === 200) {
            console.log(result, "result");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadFile: function () {
      const formData = new FormData();
      formData.append();
    },
  },
};
</script>
<style scoped>
.board_create_wrap {
}
.board_create {
  font-size: 1.2rem;
  width: 100%;
  border: 1px solid #ddd;
}
</style>
