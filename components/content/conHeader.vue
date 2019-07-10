<template>
  <div class="contentHeader">
    <section class="main-header-wrape">
      <div class="transition-box">
        <transition name="carousel-pop-up" appear>
          <h1>{{ pageTitle }}</h1>
        </transition>
      </div>
      <div class="transition-box">
        <transition name="carousel-pop-up" appear>
          <p>{{ pageSubTitle }}</p>
        </transition>
      </div>
      <div class="transition-box">
        <transition name="carousel-pop-up" appear>
          <p>{{ pageDiscription }}</p>
        </transition>
      </div>
      <div class="transition-box">
        <transition name="carousel-pop-up" appear>
          <p>{{ pageDiscriptionDetail }}</p>
        </transition>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    pageTitle: {
      type: String,
      default: ''
    },
    pageSubTitle: {
      type: String,
      default: ''
    },
    pageDiscription: {
      type: String,
      default: ''
    },
    pageDiscriptionDetail: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
.contentHeader {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 2rem;
  @media (min-width: 768px) {
    padding: 8rem 8rem;
  }
}
.transition-box {
  width: 100%;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.main-header h1,
.main-header p {
  color: $header-text;
}
h1 {
  font-size: 2rem;
  @media (min-width: 992px) {
    font-size: 3rem;
  }
}
p {
  font-size: 1rem;
  line-height: 1.2rem;
  @media (min-width: 992px) {
    font-size: 1.2rem;
    line-height: 1.4rem;
  }
}
</style>
