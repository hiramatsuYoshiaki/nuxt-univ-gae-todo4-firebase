<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        h-works
      </h1>
      <h1 class="title">
        nuxt-univ-gae-app
      </h1>
      <h2 class="subtitle">
        google cloud platform App Engine
      </h2>
      <p class="subtitle">
        nuxt server
      </p>
      <p class="subtitle">
        rendering mode Universal (SSR)
      </p>
      <div class="links">
        <!-- <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a> -->
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
          GitHub nuxt-univ-create-gae-hosting
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
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
