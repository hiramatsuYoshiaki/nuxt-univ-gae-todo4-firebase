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
    <div v-if="isSignIn" class="sign-in-modal">
      <div class="sign-in-wrap">
        <p>ログイン</p>
        <p>認証リンクを送信しました。</p>
        <p>電子メールを開いてください。</p>
        <p>リンクをクリックしてログインしてください。</p>
        <br />
        <p>ユーザー アカウント</p>
        <p>{{ email }}</p>
        <br />
        <!-- <p @click="isSignIn = false">
          <button>Close</button>
        </p> -->
      </div>
    </div>
    <div v-else>
      <div class="auth">
        <div class="auth-title">
          <h6>Firebase Authentication</h6>
          <h2>Email link</h2>
        </div>
        <div v-if="isAuthenticated">
          <p>{{ user.displayName }}さん</p>
          <p>{{ user.email }}でログイン中です。</p>

          <div class="add-btn">
            <button @click="logout">
              ログアウト
            </button>
          </div>
        </div>
        <div v-else>
          <div class="login-form">
            <form novalidate @submit.prevent="loginCheck">
              <div v-if="authErrors.length">
                <p class="error-title">
                  入力項目を確認してください。
                </p>
                <ul>
                  <li v-for="(authError, index) in authErrors" :key="index">
                    <p class="error-msg">
                      {{ authError }}
                    </p>
                  </li>
                </ul>
              </div>
              <p>
                <input
                  v-model="email"
                  type="text"
                  placeholder="メール"
                  required
                  :style="{ background: error.emailBg }"
                />
              </p>
              <!-- <p>
                <input
                  v-model="password"
                  type="password"
                  placeholder="パスワード"
                  required
                  :style="{ background: error.passwordBg }"
                />
              </p> -->
              <!-- <p v-if="register">
                <input
                  v-model="displayName"
                  type="text"
                  placeholder="ユーザー"
                  required
                  :style="{ background: error.displayNameBg }"
                />
              </p> -->

              <!-- <p>
                <input id="checkbox" v-model="register" type="checkbox" />
                <label for="checkbox">新規登録</label>
              </p> -->
              <!-- <div v-if="register">
              <button type="submit" :disabled="!formIsValidSignin">
                新規登録
              </button>
            </div>
            <div v-else>
              <button type="submit" :disabled="!formIsValidLogin">
                ログイン
              </button>
            </div> -->
              <div class="add-btn">
                <button type="submit">
                  <!-- {{ register ? '新規登録' : 'ログイン' }} -->
                  ログイン／サインイン
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isSignIn" class="modal-bg" />
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { GET_REGISTORY } from '~/store/actionTypes'
// import { ADD_REGISTORY, GET_REGISTORY } from '~/store/actionTypes'
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
      },
      isSignIn: false
    }
  },
  computed: {
    ...mapState(['user']),
    // ...mapState(['singInFinish']),
    ...mapState(['regstar']),
    ...mapState(['authErrors']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    this.$store.commit('clearAuthError')
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
        this.$store.commit('setUser', loginUser)
        this.$store.dispatch(GET_REGISTORY, loginUser)

        console.log('not setTimeout: ' + this.user) // ここだと取得できない
        setTimeout(() => {
          console.log('setTimeout: ' + this.user.email) // ここだと取得できる
          // なにかしらの処理
        })
        this.isWaiting = false
        this.isSignIn = false
      } else {
        // alert('再ログインしてください。')
        // this.email = null
        // this.displayName = null
        // this.$store.commit('setUser', null)
        // const loginUser = {
        //   uid: null,
        //   email: null,
        //   displayName: null
        // }
        // this.$store.dispatch(GET_REGISTORY, loginUser)
        // this.link_commit('/auth')
      }
    })
  },
  methods: {
    // ...mapActions(['setUser']),
    loginCheck(e) {
      this.$store.commit('clearAuthError')
      this.error.emailBg = '#e3f2fd'
      // this.error.passwordBg = '#e3f2fd'
      // this.error.displayNameBg = '#e3f2fd'
      // alert('loginCheck')
      // this.$store.commit('clearAuthError')

      // this.$store.commit('setAuthError', 'passowrd required.')
      // this.$store.commit('setAuthError', 'Email required.')

      // alert(this.isAuthError)

      // this.errors = []
      // if (!this.password) {
      //   this.$store.commit('setAuthError', 'パスワードは必須です。')
      //   this.error.passwordBg = '#f8bbd0'
      // } else if (this.password.length < 8) {
      //   this.$store.commit('setAuthError', 'パスワードは８文字以上です。')
      //   this.error.passwordBg = '#f8bbd0'
      // }
      if (!this.email) {
        this.$store.commit('setAuthError', 'メールは必須です。')
        this.error.emailBg = '#f8bbd0'
      } else if (!this.validEmail(this.email)) {
        this.$store.commit('setAuthError', '無効なメール形式です。')
        this.error.emailBg = '#f8bbd0'
      }
      // if (email.length < 4) {
      //     alert('Please enter an email address.');
      //     return;
      //   }
      // if (this.register) {
      //   if (!this.displayName) {
      //     alert('reg error')
      //     this.$store.commit('setAuthError', 'ユーザー名は必須です。')
      //     this.error.displayNameBg = '#f8bbd0'
      //   } else if (this.displayName.length > 31) {
      //     this.$store.commit('setAuthError', 'ユーザー名は３０文字以下です。')
      //     this.error.displayNameBg = '#f8bbd0'
      //   }
      // }
      // console.log('error' + this.errors)
      // if (this.errors.length) this.login()
      // this.login()

      if (this.authErrors.length) {
        // alert('error')
      } else {
        // alert('normal')
        this.login()
      }
      e.preventDefault()
    },

    login() {
      console.log('login')
      this.isWaiting = true
      this.isSignIn = true
      // if (this.register) {
      // this.$store.commit('setSignInFinish', false)
      console.log('signin')
      alert('send email deep link email: ' + this.email)
      // const actionCodeSettings = {
      //   url: 'http://' + window.location.host + '/'
      // }
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'http://' + window.location.host + '/finishSignUp',
        //   url: 'https://www.example.com/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: false
        //   iOS: {
        //     bundleId: 'com.example.ios'
        //   },
        //   android: {
        //     packageName: 'com.example.android',
        //     installApp: true,
        //     minimumVersion: '12'
        //   },
        //   dynamicLinkDomain: 'example.page.link'
      }
      firebase
        .auth()
        .sendSignInLinkToEmail(this.email, actionCodeSettings)
        .then((res) => {
          window.localStorage.setItem('emailForSignIn', this.email)
          this.isWaiting = true
        })
        .catch((error) => {
          console.log('signin  sendSignInLinkToEmail error: ' + error)
          this.isWaiting = true
        })
    },
    validEmail: (email) => {
      /* eslint-disable */
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      /* eslint-disable */
      return re.test(email)
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
          // alert('logout error' + error)
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
.auth-title{
margin-bottom: 2rem;
}
.auth-guid{
  margin-top: 2rem;
}
.add-btn button{
    border: none;
    background-color: $footer-color-color;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    color: #fff;
     margin-top: 1em;
     outline: 0;
}
.login-form{
  width: 100%;
  height: 100%;
  // overflow: scroll;
  padding: 1rem;
  @media (min-width: 992px) {
  border: 1px solid gray;
  padding: 2rem;
}
}

.error-title{
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
.error-msg{
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
.sign-in-modal{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100vw;
    // height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sign-in-wrap{
    position: relative;
    margin: 7rem 2rem 0 2rem;
    padding: 2rem;
    background-color: rgba(250, 250, 250, 1);
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    width: 90%;
    height: 50%;
    @media (min-width: 992px) {
        width: 50%;
        height: 30%;
    }


}
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  // display: none;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
