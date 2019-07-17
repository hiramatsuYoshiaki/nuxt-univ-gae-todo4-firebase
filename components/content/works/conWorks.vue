<template>
  <div class="content">
    auth
  </div>
</template>
<script>
export default {
  //   props: {
  //     pageTitle: {
  //       type: String,
  //       default: 'a'
  //     },
  //   }
  // data() {
  //   return {
  //     active: true,
  //   }
  // },
  // methods: {
  //   menuActive(index) {
  //     this.selectMenu = index
  //   }
  // }
}
</script>
<style scoped lang="scss">
.content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0.5rem;
  @media (min-width: 768px) {
    padding: 8rem 8rem;
  }
}
.flex-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
h1 {
  margin-bottom: 2rem;
  color: rgb(31, 84, 209);
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.2rem;
  @media (min-width: 992px) {
    font-size: 4rem;
    line-height: 4.2rem;
  }
}
h3 {
  color: rgb(67, 110, 211);
  margin-bottom: 2rem;
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.2rem;
  @media (min-width: 992px) {
    font-size: 2rem;
    line-height: 2.2rem;
  }
}
p {
  color: #212121;
  word-wrap: break-word;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.8rem;
  @media (min-width: 992px) {
    font-weight: 400;
    font-size: 2rem;
    line-height: 2.6rem;
  }
}
</style>
