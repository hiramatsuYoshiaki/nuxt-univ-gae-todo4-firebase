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
    <transition name="mainCon" appear>
      <div class="content-main">
        <conMypage />
      </div>
    </transition>

    <transition name="mainCon" appear>
      <div class="content-footer">
        <ContentFooter />
      </div>
    </transition>

    <transition appear name="transitionScreen">
      <TransitionScreen v-if="page === '/mypage'" />
    </transition>
  </div>
</template>
<script>
import TransitionScreen from '~/components/transition/TransitionScreen.vue'
import conMypage from '~/components/content/mypage/conMypage.vue'

import ConHeader from '~/components/content/ConHeader.vue'
import ContentFooter from '~/components/content/ContentFooter.vue'
export default {
  layout: 'topPage',
  components: {
    TransitionScreen,
    conMypage,
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
          name: 'mypage by Nuxt.js',
          content:
            'このページは、Nuxt.jsアプリケーションのインストールと使い方と設定を紹介しています。'
        }
      ]
    }
  },
  computed: {
    page() {
      return this.$store.state.page
    }
    // ...mapGetters(['isAuthenticated']),
    // ...mapState(['regstar']),
    // ...mapState(['items']),
    // ...mapState(['user'])
  }

  //   mounted() {
  //     alert('xxxxx mypage page mounted')
  //     console.log('pages/mypage.vue mounted()')
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         this.email = user.email
  //         this.displayName = user.displayName
  //         const loginUser = {
  //           uid: user.uid,
  //           email: user.email,
  //           displayName: user.displayName
  //         }
  //         this.$store.commit('setUser', loginUser)
  //         this.$store.dispatch(GET_REGISTORY, loginUser)

  //         console.log('not setTimeout: ' + this.user)
  //         setTimeout(() => {
  //           console.log('setTimeout: ' + this.user.email)

  //         })
  //       } else {
  //         const isLogin = window.confirm(
  //           'このページは、ログインが必要です。ログインしますか。 mypage page'
  //         )
  //         if (isLogin) {
  //           this.$store.commit('pagePathSet', '/auth')
  //           this.$router.push('/auth')
  //         } else {
  //           this.$store.commit('pagePathSet', '/')
  //           this.$router.push('/')
  //         }
  //       }
  //     })
  //     // setTimeout(() => {
  //     this.loaded = true
  //     // }, 1000)
  //   },
  // methods: {
  //   link_commit(linkPath) {
  //     this.$store.commit('pagePathSet', linkPath)
  //     setTimeout(() => {
  //       this.$router.push({ path: linkPath })
  //     }, 500)
  //   }
  // }
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
}
.content-main {
  width: 100vw;
  background-color: $main-contents-color;
  color: $main-contents-text;
}
.content-footer {
  width: 100vw;
  @extend %center;
  flex-direction: column;
}
.loading {
  @extend %center;
  flex-direction: column;
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
