<template>
  <div class="container">
    <div class="content-header">
      <div class="content con-wraper">
        <div class="con-hed-logo">
          <logo />
        </div>
        <div class="con-hed-title">
          <h2 class="title">
            h-works
          </h2>
          <div class="subtitle">
            <h5>Nuxt.js</h5>
            <h5>Google Cloud Platform</h5>
            <h5>App Engine</h5>
          </div>
          <div class="subscription">
            <p>Nuxt Project</p>
            <p>create-nuxt-app v2.8.0</p>
            <p>? Choose custom server framework None</p>
            <p>? Choose rendering mode Universal (SSR)</p>
            <!-- <p>
              Generating Nuxt.js project in ~\nuxt-univ-gae-app
            </p>
            <p>? Project name nuxt-univ-gae-app</p>
            <p>? Project description My spectacular Nuxt.js project</p>
            <p>? Author name hiramatsu</p>
            <p>? Choose the package manager Npm</p>
            <p>? Choose UI framework None</p>
            <p>? Choose custom server framework None (Recommended)</p>
            <p>? Choose Nuxt.js modules Axios</p>
            <p>? Choose linting tools ESLint, Prettier</p>
            <p>? Choose test framework None</p>
            <p>? Choose rendering mode Universal (SSR)</p> -->
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <h1 class="title">
        h-works Base Template
      </h1>
      <h1 class="title">
        nuxt-univ-create-gae-hosting
      </h1>
      <h2 class="subtitle">
        google cloud platform App Engine
      </h2>
      <p class="subtitle">
        custom server framework None
      </p>
      <p class="subtitle">
        rendering mode Universal (SSR)

      </p> -->

      <div class="links">
        <a
          href="https://nuxt-univ-gae-app.appspot.com/"
          target="_blank"
          class="button--green"
        >
          Demo App (Google App Engine)
        </a>
        <a
          href="https://github.com/hiramatsuYoshiaki/nuxt-univ-create-gae-hosting"
          target="_blank"
          class="button--grey"
        >
          nuxt-univ-create-gae-hosting (GitHub )
        </a>
      </div>
      <br>

      <h3 class="subtitle">
        How to Deploy Google App Engine
      </h3>
      <p class="subtitle">
        1.app.yaml設置
      </p>
      <p class="subtitle">
        2.App Engineに新しいプロジェクトを作成する。
      </p>
      <p class="subtitle">
        3.Cloud SDK をインストールし初期化する。
      </p>
      <p class="subtitle">
        4.ビルドしデプロイする。
      </p>
      
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  layout: 'topPage',
  components: {
    Logo
  }
}
</script>

<style scoped lang="scss">
%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
%left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
%right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
//content base-----------------------
.container {
  margin-top: $header-height;
  width: 100vw;
  @extend %center;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  // background: black;
  // background: linear-gradientrgb(#0d47a1, #05fbff);
  background: linear-gradient(#0452c7, #9dacf0);
  // background: linear-gradient(#05fbff, #1e00ff);
}
// wraper-----------------------------
.con-wraper {
  padding: 8rem 2rem;
  @media (min-width: 992px) {
    padding: 15rem 5rem;
  }
}
//header-----------------------------
.content-header {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.con-hed-logo {
  @extend %center;
  width: 100%;
  @media (min-width: 992px) {
    width: 40%;
  }
}
.con-hed-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 992px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  h2 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 3.5rem;
  }
  h5 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.5rem;
  }
  p {
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.5rem;
  }
  // .sign-in-text {
  //   font-size: 1.6rem;
  //   font-weight: 500;
  //   line-height: 2.1rem;
  // }
  @media (min-width: 992px) {
    width: 70%;
    h2 {
      font-size: 8rem;
      font-weight: 700;
      line-height: 8.5rem;
    }
    h5 {
      font-size: 3rem;
      font-weight: 400;
      line-height: 3.2rem;
    }
    p {
      font-size: 2rem;
      font-weight: 500;
      line-height: 2.2rem;
    }
    // .sign-in-text {
    //   font-size: 2rem;
    //   font-weight: 500;
    //   line-height: 2.5rem;
    // }
  }
  // .btn-box {
  //   width: 30rem;
  //   margin-top: 2rem;
  //   padding: 1rem 3rem;
  //   border: 2px solid #fff;
  //   border-radius: 5px;
  //   cursor: pointer;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   @media (min-width: 992px) {
  //     justify-content: flex-start;
  //     align-items: flex-start;
  //   }
  // }
  // .image-mask {
  //   border-radius: 50%;
  //   width: 5rem;
  //   height: 5rem;
  // }
}

// content-header-second-------------------------
// .content-header-second {
//   @extend %center;
//   flex-direction: column;
//   width: 100%;
// }
// content-main-title----------------------------
// .content-main-tec {
//   width: 100vw;
//   height: 100%;
//   @media (min-width: 992px) {
//     height: 100vh;
//   }
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
// }
// .con-mein-top {
//   justify-content: space-between;
//   align-items: stretch;
// }
// .con-main-sec {
//   position: relative;
//   width: 100%;
//   padding: 2rem 2rem 6rem 2rem;
//   margin-bottom: 2rem;
//   @media (min-width: 992px) {
//     width: 20%;
//   }
//   background-color: #fff;
//   color: #212121;
//   border: 2px solid rgba(0, 0, 0, 0.3);
//   border-radius: 5px;
// }
// .con-main-sec {
//   h1 {
//     font-size: 3rem;
//     font-weight: 700;
//     line-height: 3.5rem;
//   }
//   h2 {
//     font-size: 2rem;
//     font-weight: 500;
//     line-height: 2.5rem;
//   }
//   p {
//     font-size: 1.2rem;
//     font-weight: 500;
//     line-height: 1.4rem;
//   }
//   @media (min-width: 992px) {
//     h1 {
//       font-size: 6rem;
//       font-weight: 700;
//       line-height: 6.5rem;
//     }
//     h2 {
//       font-size: 4rem;
//       font-weight: 400;
//       line-height: 4.5rem;
//     }
//     p {
//       font-size: 2rem;
//       font-weight: 400;
//       line-height: 2.5rem;
//     }
//   }
// }
// .con-main-line {
//   width: 100%;
//   height: 1px;
//   background-color: #212121;
//   margin: 2rem 0;
// }
// .page-link {
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   text-align: right;
//   color: rgb(6, 140, 250);
//   font-weight: 700;
//   width: 100%;
//   cursor: pointer;
//   display: block;
//   margin: 2rem;
// }
// main inpliment------------------------------
// .content-main-implement {
//   width: 100vw;
//   background-color: rgb(230, 230, 230);
//   color: #212121;
//   border-top: rega(0, 0, 0, 0.2);
// }
// .content-main-title {
//   @extend %center;
//   flex-direction: column;
//   width: 100%;
//   padding: 5rem 0 0 0;
// }
// .con-mein-project {
//   justify-content: space-between;
// }
// .con-main-imp {
//   width: 100%;
//   padding: 2rem;
//   background-color: rgb(170, 170, 170);
//   @media (min-width: 992px) {
//     width: 30%;
//   }
//   border-radius: 5px;
//   margin-bottom: 2rem;
// }
// .con-main-impList {
//   padding: 2rem;
//   background-color: rgb(230, 230, 230);
//   margin: 2rem 0;
//   border-radius: 5px;
// }
// .gitHub-link {
//   text-align: left;
//   color: #212121;
//   font-weight: 700;
//   width: 100%;
//   cursor: pointer;
//   display: block;
// }

.links {
  @extend %center;
}
.links a {
  display: inline-block;
  margin: 0 2rem;
  cursor: pointer;
}
// .word-wrap {
//   word-wrap: break-word;
// }
.title {
  margin: 2rem 0 1rem 0;
  color: #fff;
}
.subtitle {
  margin: 0rem 0 4rem 0;
  color: #fff;
}
.subscription {
  margin-bottom: 2rem;
  color: rgb(25, 25, 25);
}
// .content-footer {
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   margin-bottom: -5rem;
// }

// .done {
//   text-decoration: line-through;
// }
</style>
