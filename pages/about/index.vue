<template>
  <div class="container">
    <!-- <div v-if="false" class="bgImageFull">
      <transition name="bgTran" appear>
        <div
          class="bgImage"
          :style="{ 'background-image': 'url(' + img + ') ' }"
        >
          <div class="bg_filter" />
        </div>
      </transition>
    </div> -->
    <!-- <div v-if="false" class="content-header">
      <ConHeader
        :page-title="pageTitle"
        :page-sub-title="pageSubTitle"
        :page-discription="pageDiscription"
        :page-discription-detail="pageDiscriptionDetail"
      />
    </div> -->

    <transition name="mainCon" appear>
      <div class="content-main">
        <ConAbout />
      </div>
    </transition>

    <!-- <transition v-if="false" name="mainCon" appear>
      <div class="content-footer">
        <ContentFooter />
      </div>
    </transition> -->

    <!-- <transition v-if="false" appear name="transitionScreen">
      <TransitionScreen v-if="page === '/about'" />
    </transition> -->
  </div>
</template>
<script>
// import TransitionScreen from '~/components/transition/TransitionScreen.vue'
import ConAbout from '~/components/content/about/ConAbout.vue'

// import ConHeader from '~/components/content/ConHeader.vue'
// import ContentFooter from '~/components/content/ContentFooter.vue'
// import firebase from '@/plugins/firebase'
export default {
  // layout: 'topPage',
  //   transition: 'content-slide',
  components: {
    // TransitionScreen,
    ConAbout
    // ConHeader,
    // ContentFooter
  },
  data() {
    return {
      // img: require('~/assets/img/img2722.jpg'),
      // pageTitle: 'CRUD',
      // pageSubTitle: 'Firebase',
      // pageDiscription: 'Database Strage',
      // pageDiscriptionDetail: 'Todoリストを作成するデモ'
    }
  }
  // head() {
  //   return {
  //     title: this.pageTitle,
  //     meta: [
  //       {
  //         hid: 'description',
  //         name: 'about by Nuxt.js',
  //         content:
  //           'このページは、Nuxt.jsアプリケーションのインストールと使い方と設定を紹介しています。'
  //       }
  //     ]
  //   }
  // },
  // computed: {
  //   page() {
  //     return this.$store.state.page
  //   }
  // },
  // mounted() {
  //   console.log('mounted')
  //   firebase.auth().onAuthStateChanged(async (user) => {
  //     if (user) {
  //       await console.log('login')
  //     } else {
  //       await console.log('logout')
  //     }
  //   })
  // },
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
// .content-header {
//   width: 100vw;
//   height: 35vh;
// }
.content-main {
  width: 100vw;
  background-color: $main-contents-color;
  color: $main-contents-text;
}
// .content-footer {
//   width: 100vw;
//   @extend %center;
//   flex-direction: column;
// }
</style>
