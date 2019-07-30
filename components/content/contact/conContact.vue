<template>
  <div class="conContent">
    <div class="flex-container">
      <div class="two-col">
        <div class="col-block left-block">
          <div class="section-block left-section">
            <div class="contact-title">
              <h1>HIRAMATSU WORKS</h1>
              <div class="link-text">
                <a
                  href="http://tourdehdr.sakuraweb.com/h-works-website/index.html"
                >
                  <h5>Portfolio</h5>
                  <h5>Site</h5>
                  <!-- <h5>
                    http://tourdehdr.sakuraweb.com/h-works-website/index.html
                  </h5> -->
                </a>
              </div>
              <br />
              <p>
                このWEBサイトは、作品をご覧いただき、デザイン、コーディング、プログラミングなどのスキルレベルをご確認いただくために作成しております。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="two-col">
        <div class="col-block right-block">
          <div class="section-block left-section">
            <p>
              <i class="far fa-envelope" /><span>hiramatsu3300@gmail.com</span>
            </p>
            <p><i class="fas fa-phone" /><span>111-222-33333</span></p>
            <br />
            <p>Minami 444-55</p>
            <p>Okayama</p>
            <p>japan</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   props: {
  //     msg: String
  //   }
}
</script>

<style scoped lang="scss">
.conContent {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 2rem;
  @media (min-width: 768px) {
    padding: 8rem 8rem;
  }
  color: #fff;
  a {
    color: #fff;
    text-decoration: none;
    :hover {
      opacity: 0.5;
    }
  }
}
.flex-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 992px) {
    flex-direction: row;
  }
}
.two-col {
  width: 90vw;
  height: 100%;
  padding: 2rem 2rem;
  @media (min-width: 992px) {
    width: 50%;
    padding: 8rem;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $footer-color-color;
  h1 {
    font-size: 2rem;
    @media (min-width: 992px) {
      font-size: 2.6rem;
      line-height: 3rem;
      margin-bottom: 2rem;
    }
  }
  p {
    font-size: 1.4rem;
    line-height: 2rem;
    @media (min-width: 992px) {
      font-size: 1rem;
    }
  }
}
.col-block {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 992px) {
    text-align: left;
  }
}
</style>
