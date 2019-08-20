<template>
  <div class="container">
    <div class="content con-wraper">
      <div class="con-hed-logo">
        <logo />
      </div>
      <div class="con-hed-title">
        <h2 class="title">
          h-works Firebas
        </h2>
        <div class="subtitle">
          <h5>Nuxt.js</h5>
          <h5>Google Cloud Platform</h5>
          <h5>App Engine</h5>
        </div>
        <!-- <div class="subscription">
          <div class="menu_link todo-demo" @click="link_commit('/about')">
            <h3>TODOS<span>DEMOを見る</span></h3>
            <div class="line" />
            <p>Authentication</p>
            <p>Database</p>
            <p>Strage</p>
            <div>Used: Firebase</div>
          </div>
        </div> -->
        <div class="subscription">
          <div class=" todo-demo">
            <h3>Authentication</h3>
            <div class="line" />
            <div>
              <div class="menu_link " @click="link_commit('/loginEmail')">
                <p><i class="material-icons">insert_link</i>Email Password</p>
              </div>
            </div>
            <div>
              <div class="menu_link " @click="link_commit('/emailLink')">
                <p><i class="material-icons">insert_link</i>Email Link</p>
              </div>
            </div>

            <div>
              <div class="menu_link " @click="link_commit('/loginGoogle')">
                <p><i class="material-icons">insert_link</i>Google</p>
              </div>
            </div>
            <!-- <div>Used: Firebase</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="sub-content sub-con-wraper">
      <div class="overview">
        <h5>App概要</h5>
        <span class="small-p">
          Todosリストの試作デモです。
          Vue.jsのフレームワークNuxt.jsでSSRを想定し, google Cloud
          Platformでホスティングしています。Firebaseを使って、認証とデータと画像を記録しています。
        </span>
      </div>
    </div>
    <div class="sub-content sub-con-wraper">
      <div class="overview">
        <div class="links">
          <a
            href="https://nuxt-univ-gae-app.appspot.com/"
            target="_blank"
            class="button--green"
          >
            Setting
          </a>
          <a
            href="https://github.com/hiramatsuYoshiaki/nuxt-univ-gae-todo2-firebase"
            target="_blank"
            class="button--grey"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import { mapState } from 'vuex'
// import { INIT_TODO } from '~/store/actionTypes'
import Logo from '~/components/Logo.vue'

export default {
  layout: 'topPage',
  // layout: 'default',
  // layout: 'custom',
  components: {
    Logo
  },
  // async asyncData({}) {
  //   const { data } = await axios.get(`https://www.instagram.com/p/BzqBMl3g9vA/`)
  //   return { title: data.title }
  // }
  // computed: {
  //   ...mapState(['items'])
  // },
  // created() {
  //   console.log('create')
  //   this.$store.dispatch(INIT_TODO)
  // }
  methods: {
    link_commit(linkPath) {
      this.active = true
      this.$store.commit('pagePathSet', linkPath)
      console.log('linkPath: ' + linkPath)
      setTimeout(() => {
        if (linkPath === '/about') {
          location.href = linkPath // reload
        } else {
          this.$router.push({ path: linkPath }) // non-leload
        }
      }, 500)
    }
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
  min-height: 100vh;
  @extend %center;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background: linear-gradient(#0452c7, #9dacf0);
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
}
// wraper-----------------------------
.con-wraper {
  padding: 8rem 2rem 0rem 2rem;
  @media (min-width: 992px) {
    padding: 10rem 5rem 0rem 5rem;
  }
}
.sub-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 992px) {
    flex-direction: row;
  }
}
.sub-con-wraper {
  padding: 0rem 2rem 0rem 2rem;
  @media (min-width: 992px) {
    padding: 0rem 5rem 0rem 5rem;
  }
  h5 {
    margin-bottom: 1rem;
  }
}
//header-----------------------------
// .content-header {
//   width: 100vw;
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
// }
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
}

.menu_link {
  display: inline-block;
  opacity: 0.75;
  color: darkblue;
  opacity: 1;
  // text-transform: uppercase;
  font-size: $nav_font_size;
  font-weight: $nav_font_weight;
  cursor: pointer;
  &:hover {
    opacity: 1;
    color: #fff;
  }
}
.todo-demo {
  margin: 0rem 0 2rem 0;
  color: darkblue;
  border: 2px solid #1a237e;
  border-radius: 4px;
  padding: 1rem 2rem;

  // margin: 2rem 0;
  span {
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 2.5rem;
    margin-left: 1rem;
    vertical-align: bottom;
    @media (min-width: 992px) {
      font-size: 1.2rem;
      line-height: 4.5rem;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    border: 1px solid#1a237e;
    margin-bottom: 1rem;
  }
}

.links {
  @extend %center;
  margin: 2rem;
}
.links a {
  display: inline-block;
  margin: 0 2rem;
  cursor: pointer;
}

.title {
  margin: 2rem 0 1rem 0;
  color: #fff;
}
.subtitle {
  margin: 0rem 0 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  @media (min-width: 992px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
}
.subscription {
  margin: 0rem 0 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #424242;
  @media (min-width: 992px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
}
.overview {
  width: 90%;
  @media (min-width: 992px) {
    width: 50%;
  }
  margin: 0rem 0 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #212121;
  // @media (min-width: 992px) {
  //   justify-content: flex-start;
  //   align-items: flex-start;
  // }
}
h2 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 3.5rem;
}
h3 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.5rem;
}
h5 {
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5rem;
}

p {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.75rem;
}
.small-p {
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 2rem;
}
@media (min-width: 992px) {
  width: 70%;
  h2 {
    font-size: 6rem;
    font-weight: 700;
    line-height: 6.5rem;
  }
  h3 {
    font-size: 4rem;
    font-weight: 700;
    line-height: 4.5rem;
  }
  h5 {
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 2.9rem;
  }
  p {
    font-size: 2.2rem;
    font-weight: 500;
    line-height: 1.9rem;
  }
  .small-p {
    font-size: 1rem;
    font-weight: 500;
    line-height: 2rem;
  }
}
</style>
