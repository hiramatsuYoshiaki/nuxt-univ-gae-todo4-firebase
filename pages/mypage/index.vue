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
    <!-- <div class="content-main"> -->
    <!-- <conMypage /> -->
    <!-- <nuxt-child /> -->
    <!-- </div> -->
    <!-- </transition> -->

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
    <!-- <div v-for="reg in regstar" :key="reg.key">
      <div v-if="!reg.registration" class="registre">
        <div class="message-wrap">
          <p>
            メールを確認してください。
          </p>
          <br />
          <h3>ユーザー登録が完了していません。</h3>
          <br />
          <p>
            サインインしたメールアドレスに、メールが送信されました。
          </p>
          <p>
            リンクをクリックして、ユーザー登録を完了してください。
          </p>
          <p>
            または、ユーザー登録ページがら登録してください。
          </p>
          <div class="add-btn">
            <button @click="link_commit('/userProf')">
              戻る
            </button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div v-if="!loaded" class="loading"> -->
    <!-- <h1>login ...</h1> -->
    <!-- </div> -->
  </div>
</template>
<script>
// import { mapState, mapGetters } from 'vuex'
// import firebase from '@/plugins/firebase'
// import { GET_REGISTORY } from '~/store/actionTypes'
import TransitionScreen from '~/components/transition/TransitionScreen.vue'
import conMypage from '~/components/content/mypage/conMypage.vue'

import ConHeader from '~/components/content/ConHeader.vue'
import ContentFooter from '~/components/content/ContentFooter.vue'
// import firebase from '@/plugins/firebase'
export default {
  layout: 'topPage',
  //   transition: 'content-slide',
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
  },

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
// .registre {
//   @extend %center;
//   flex-direction: column;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.7);
//   color: #fff;
//   margin: 0;
//   padding: 0;
//   z-index: 900;
// }
// .message-wrap {
//   border: 1px solid #fff;
//   background-color: gray;
//   padding: 1rem;
//   width: 90%;
//   @extend %center;
//   flex-direction: column;
//   @media (min-width: 992px) {
//     width: 70%;
//     padding: 2rem;
//   }
// }
// .add-btn button {
//   border: none;
//   background-color: $footer-color-color;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
//   color: #fff;
//   margin-top: 1em;
//   outline: 0;
// }
</style>
