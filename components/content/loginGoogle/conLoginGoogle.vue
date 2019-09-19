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
        <div class="auth-title">
          <h6>Firebase Authentication</h6>
          <h2>Google Login</h2>
        </div>
        <div v-if="isAuthenticated">
          <p>{{ user.displayName }}でログイン中です。</p>
          <div class="add-btn">
            <button @click="logout">
              ログアウト
            </button>
          </div>
        </div>
        <div v-else>
          <div class="login-form">
            <div class="add-btn">
              <button @click="login">
                Google Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { ADD_REGISTORY, GET_REGISTORY } from '~/store/actionTypes'
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
      errors: [],
      email: null,
      password: null,
      displayName: null,
      isWaiting: false,
      register: null,
      error: {
        emailBg: '#e3f2fd',
        passwordBg: '#e3f2fd',
        displayNameBg: '#e3f2fd'
      }
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['regstar']),
    ...mapState(['authErrors']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    this.$store.commit('clearAuthError')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid)
        console.log(user.email)
        console.log(user.displayName)
        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
        // this.$store.commit('setUser', loginUser)
        // this.$store.dispatch(GET_REGISTORY, loginUser)

        // console.log('not setTimeout: ' + this.user.email) // ここだと取得できない
        setTimeout(() => {
          this.$store.commit('setUser', loginUser)
          this.$store.dispatch(GET_REGISTORY, loginUser)

          // console.log('loginUser: ' + loginUser.displayName) // ここだと取得できる
          // console.log('loginUser: ' + loginUser.uid) // ここだと取得できる
          // for (const regItem of this.regstar) {
          //   console.log('uid: ' + regItem.uid) // ここだと取得できる
          // }
        })
      } else {
        alert('loginMail mount+++++　onAuthStateChanged　not user ')
        this.email = null
        this.displayName = null
        this.$store.commit('setUser', null)
      }
    })
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      this.isWaiting = true
      if (this.register) {
        console.log('signin')
        // window.location = 'https://www.amazon.co.jp/'
        // https://support.google.com/accounts/answer/27441?hl=ja
      } else {
        console.log('login email pass')
        // const regstars = this.regstar
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            // const lp = '/about'
            // this.link_commit(lp)
            const user = firebase.auth().currentUser
            if (user) {
              console.log('user.uid:' + user.uid)
              const loginUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
              }
              this.$store.dispatch(GET_REGISTORY, loginUser)
            }
            this.isWaiting = false
            return user
          })
          .then((user) => {
            let regUid = null
            for (const regst of this.regstar) {
              regUid = regst.uid
            }
            console.log('regUid:' + regUid)
            if (regUid) {
              console.log('firebase auth update user')
            } else {
              console.log('firebase auth add user')
              this.$store.dispatch(ADD_REGISTORY, {
                uid: user.uid,
                email: '',
                displayName: user.displayName,
                registration: false
              })
            }
          })
          .catch((error) => {
            // alert('login error' + error)
            console.log('login error' + error)
            this.isWaiting = false
            // this.errors.push('Invalid email .')
            this.$store.commit('setAuthError', error)
          })
      }
    },

    logout() {
      console.log('logout')
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('setUser', null)
          // this.setUser(null)
        })
        .catch((error) => {
          alert('logout error' + error)
        })
    },
    link_commit(linkPath) {
      this.active = true
      this.$store.commit('pagePathSet', linkPath)
      setTimeout(() => {
        if (linkPath === '/about') {
          location.href = linkPath // reload
        } else {
          this.$router.push({ path: linkPath }) // non-leload
        }
      }, 500)
      // setTimeout(() => {
      //   this.$router.push({ path: linkPath })
      // }, 500)
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
.auth-title {
  margin-bottom: 2rem;
}
.auth-guid {
  margin-top: 2rem;
}
.add-btn button {
  border: none;
  background-color: $footer-color-color;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  color: #fff;
  margin-top: 1em;
  outline: 0;
}
.login-form {
  width: 100%;
  height: 100%;
  // overflow: scroll;
  padding: 1rem;
  @media (min-width: 992px) {
    border: 1px solid gray;
    padding: 2rem;
  }
}

.error-title {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 1rem;
  color: rgb(2, 2, 2);
  @media (min-width: 992px) {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1rem;
  }
}
.error-msg {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 1rem;
  color: rgb(190, 29, 29);
  margin-left: 1rem;
  @media (min-width: 992px) {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1rem;
  }
}

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
