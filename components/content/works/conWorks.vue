<template>
  <div class="content">
    <div v-if="isWaiting">
      <p>login.....</p>
      <svg
        class="spinner"
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="6"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </div>
    <div v-else>
      <div class="auth">
        <div v-if="isAuthenticated">
          <p>{{ user.email }}でログイン中です。</p>
          <p>e-mail:{{ user.email }}</p>
          <p>uid:{{ user.uid }}</p>
          <p>displayName:{{ user.dispalyName }}</p>

          <button @click="logout">
            ログアウト
          </button>
          <a href="/works">CRTU</a>
        </div>

        <div v-else>
          <p><input v-model="email" type="text" /></p>
          <p><input v-model="password" type="password" /></p>
          <p>
            <input id="checkbox" v-model="register" type="checkbox" />
            <label for="checkbox">新規登録</label>
          </p>

          <button @click="login">
            {{ register ? '新規登録' : 'ログイン' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
// import { mapState, mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'
export default {
  //   props: {
  //     pageTitle: {
  //       type: String,
  //       default: 'a'
  //     },
  //   }
  data() {
    return {
      email: '',
      password: '',
      isWaiting: false,
      register: ''
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('uid: ' + user.uid)
        console.log('email: ' + user.email)
        console.log('displayName: ' + user.displayName)
        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
        this.setUser(loginUser)
        console.log('not setTimeout: ' + this.user) // ここだと取得できない
        setTimeout(() => {
          console.log('setTimeout: ' + this.user.email) // ここだと取得できる
          // なにかしらの処理
        })
      }
    })
  },
  methods: {
    ...mapActions(['setUser']),
    // ...mapActions(['setUser']),
    login() {
      this.isWaiting = true
      if (this.register) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            // ログインしたら飛ぶページを指定
            // this.$router.push('/about')
            const lp = '/about'
            this.link_commit(lp)
            this.isWaiting = false
          })
          .catch((error) => {
            alert('login error' + error)
            this.isWaiting = false
          })
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            // ログインしたら飛ぶページを指定
            // this.$router.push('/about')
            const lp = '/about'
            this.link_commit(lp)
            this.isWaiting = false
          })
          .catch((error) => {
            alert('login error' + error)
            this.isWaiting = false
          })
      }
    },
    logout() {
      console.log('logout')
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(null)
        })
        .catch((error) => {
          alert('logout error' + error)
        })
    },
    link_commit(linkPath) {
      this.active = true
      this.$store.commit('pagePathSet', linkPath)
      console.log('linkPath: ' + linkPath)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
      }, 500)
    }
  }
}
</script>
<style scoped lang="scss">
$offset: 187;
$duration: 1.4s;
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
.auth {
  padding: 2rem;
}
// .flex-container {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   @media (min-width: 768px) {
//     flex-direction: row;
//   }
// }
// h1 {
//   margin-bottom: 2rem;
//   color: rgb(31, 84, 209);
//   font-weight: 600;
//   font-size: 2rem;
//   line-height: 2.2rem;
//   @media (min-width: 992px) {
//     font-size: 4rem;
//     line-height: 4.2rem;
//   }
// }
// h3 {
//   color: rgb(67, 110, 211);
//   margin-bottom: 2rem;
//   font-weight: 400;
//   font-size: 2rem;
//   line-height: 2.2rem;
//   @media (min-width: 992px) {
//     font-size: 2rem;
//     line-height: 2.2rem;
//   }
// }
// p {
//   color: #212121;
//   word-wrap: break-word;
//   font-weight: 400;
//   font-size: 1.4rem;
//   line-height: 1.8rem;
//   @media (min-width: 992px) {
//     font-weight: 400;
//     font-size: 2rem;
//     line-height: 2.6rem;
//   }
// }
.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite,
    colors ($duration * 4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>
