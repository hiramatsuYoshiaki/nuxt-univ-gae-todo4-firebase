<template>
  <div class="container">
    <div class="bgImageFull">
      <transition name="bgTran" appear>
        <div
          class="bgImage"
          :style="{ 'background-image': 'url(' + img + ') ' }"
        >
          <div class="bg_filter" />
        </div>
      </transition>
    </div>
    <div class="content-header">
      <ConHeader
        :page-title="pageTitle"
        :page-sub-title="pageSubTitle"
        :page-discription="pageDiscription"
        :page-discription-detail="pageDiscriptionDetail"
      />
    </div>

    <!-- <transition name="mainCon" appear> -->
    <div class="content-main">
      <!-- <ConAbout /> -->
      <nuxt-child />
    </div>
    <!-- </transition> -->

    <transition name="mainCon" appear>
      <div class="content-footer">
        <ContentFooter />
      </div>
    </transition>

    <transition appear name="transitionScreen">
      <TransitionScreen v-if="page === '/about'" />
    </transition>
    <div v-if="!loaded" class="loading">
      <!-- <h1>login ...</h1> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import TransitionScreen from '~/components/transition/TransitionScreen.vue'
// import ConAbout from '~/components/content/about/ConAbout.vue'

import ConHeader from '~/components/content/ConHeader.vue'
import ContentFooter from '~/components/content/ContentFooter.vue'
// import firebase from '@/plugins/firebase'
export default {
  layout: 'topPage',
  //   transition: 'content-slide',
  components: {
    TransitionScreen,
    // ConAbout,
    ConHeader,
    ContentFooter
  },

  data() {
    return {
      img: require('~/assets/img/img2722.jpg'),
      pageTitle: 'CRUD',
      pageSubTitle: 'Firebase',
      pageDiscription: 'Database Strage',
      pageDiscriptionDetail: 'Todoリストを作成するデモ',
      loaded: false
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        // `hid` は一意の識別子として使用されます。 `vmid` は動作しないので使わないでください。
        {
          hid: 'description',
          name: 'about by Nuxt.js',
          content:
            'このページは、Nuxt.jsアプリケーションのインストールと使い方と設定を紹介しています。'
        }
      ]
    }
  },

  computed: {
    page() {
      return this.$store.state.page
    },
    ...mapGetters(['isAuthenticated']),
    ...mapState(['regstar']),
    ...mapState(['items']),
    ...mapState(['user'])
  },
  created() {
    console.log('pages/about.vue created()')
  },
  mounted() {
    // console.log('pages/about.vue mounted()')

    setTimeout(() => {
      if (!this.isAuthenticated) {
        // ログインしていなかったら飛ぶページを設定
        this.$store.commit('pagePathSet', '/works')
        this.$router.push('/works')
      } else {
        // alert(this.regstar)
        // alert(this.items)
        // alert(this.user.uid)
        // console.log(this.regstar)
        // this.loaded = true
      }
    }, 0)
    // console.log('mounted')
    // firebase.auth().onAuthStateChanged(async (user) => {
    //   if (user) {
    //     await console.log('login:' + user)
    //   } else {
    //     await console.log('logout: ' + user)
    //     await this.link_commit('works')
    //   }
    // })
    // setTimeout(() => {
    this.loaded = true
    // }, 1000)
  },
  methods: {
    link_commit(linkPath) {
      this.$store.commit('pagePathSet', linkPath)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
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
.container {
  position: relative;
  width: 100vw;
  height: 100%;
  margin-top: $header-height;
  @extend %center;
  flex-direction: column;
}
.content-header {
  width: 100vw;
  height: 35vh;
  // padding: 1rem 1rem;
  // border: 1px solid yellow;
}
.content-main {
  // height: 75vh;
  width: 100vw;
  background-color: $main-contents-color;
  color: $main-contents-text;
  // padding-bottom:20rem;
  // padding-left: 2rem;
  // border: 1px solid orangered;
}
.content-footer {
  width: 100vw;
  @extend %center;
  flex-direction: column;
  // border: 1px solid red;
}
.loading {
  @extend %center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: $body-color;
  color: #fff;
  margin: 0;
  padding: 0;
  z-index: 1000;
}
</style>
