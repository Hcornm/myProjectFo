<template>
  <div>
    <h1> {{ test }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: {},
    };
  },
  created() {
    this.searchTest();
  },
  methods: {
    searchTest: function () {
      this.$axios
        .get("http://localhost:8080/member/memberList")
        .then((result) => {
          if (result.status === 200) {
            this.test = { ...result.data };
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
