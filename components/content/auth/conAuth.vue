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
          <p>ログインするタイプを選んでください。</p>
        </div>

        <div class="login-type-sellect">
          <!-- email pass -->
          <div class="auth-title login-type" @click="link_commit('loginEmail')">
            <div class="login-type-wrap">
              <h2>Email and Password</h2>
              <h6>メールとパスワードに基づく認証</h6>
              <p>メールアドレスとパスワードを使用してログインする</p>
            </div>
          </div>
          <br />
          <!-- email link -->
          <div class="auth-title login-type" @click="link_commit('emailLink')">
            <div class="login-type-wrap">
              <h2>Email Link</h2>
              <h6>ユーザーに確認メールを送信する</h6>
              <p>
                メールアドレスとパスワードを使用してログインし、確認メールを送信する
              </p>
            </div>
          </div>
          <br />
          <!-- google         -->
          <div
            class="auth-title login-type"
            @click="link_commit('loginGoogle')"
          >
            <div class="login-type-wrap">
              <h2>Google</h2>
              <h6>フェデレーション ID プロバイダとの統合</h6>
              <p>Googleアカウントを使用してログインする。</p>
            </div>
          </div>
          <br />
          <!-- Gituub -->
          <div
            class="auth-title login-type"
            @click="link_commit('loginGoogle')"
          >
            <div class="login-type-wrap">
              <h2>GitHub</h2>
              <h6>フェデレーション ID プロバイダとの統合</h6>
              <p>GoogleGitHubアカウントを使用してログインする。</p>
            </div>
          </div>
          <br />
          <!-- User Prof -->
          <div class="auth-title login-type" @click="link_commit('userProf')">
            <div class="login-type-wrap">
              <h2>User Profele Update</h2>
              <h6>ユーザー情報の変更</h6>
              <p>User Profele Updateを更新する</p>
            </div>
          </div>
          <br />
          <!-- User Prof -->
          <div class="auth-title login-type" @click="link_commit('userMail')">
            <div class="login-type-wrap">
              <h2>Email Upadet</h2>
              <h6>メールアドレス変更</h6>
              <p>Email を変更する</p>
            </div>
          </div>
          <br />
          <!-- User Prof -->
          <div class="auth-title login-type" @click="link_commit('userPass')">
            <div class="login-type-wrap">
              <h2>Pass Upadet</h2>
              <h6>パスワード変更変更</h6>
              <p>Password を変更する</p>
            </div>
          </div>
          <br />
          <!-- User Prof -->
          <div class="auth-title login-type" @click="link_commit('userDel')">
            <div class="login-type-wrap">
              <h2>user del</h2>
              <h6>ユザーを削除する</h6>
              <p>userを削除する</p>
            </div>
          </div>
          <br />
        </div>

        <div v-if="isAuthenticated">
          <p>{{ user.email }}でログイン中です。</p>
          <!-- <p>name:{{ userProf.name }}</p>
          <p>email:{{ userProf.email }}</p>
          <p>photo:{{ userProf.photoUrl }}</p> -->
          <!-- <p>{{ userProf.emailVerified }}</p> -->
          <!-- <p>uid:{{ userProf.uid }}</p> -->
          <!-- <div class="add-btn">
            <button @click="logout">
              ログアウト
            </button>
          </div> -->
        </div>
        <!-- <div v-else>
          <div class="login-form" />
          <div class="auth-guid">
            <h5>Login Type</h5>
            <p>ログインするタイプを選んでください。</p>
          </div>
        </div> -->
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
    ...mapState(['userProf']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    this.$store.commit('clearAuthError')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('uid: ' + user.uid)
        // console.log('email: ' + user.email)
        // console.log('displayName: ' + user.displayName)
        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: ''
        }
        this.$store.commit('setUser', loginUser)
        // this.setUser(loginUser)
        this.$store.dispatch(GET_REGISTORY, loginUser)

        console.log('not setTimeout: ' + this.user.email) // ここだと取得できない
        setTimeout(() => {
          console.log('setTimeout: ' + this.user.email) // ここだと取得できる
          // なにかしらの処理
          const userProf = {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid
          }
          this.$store.commit('setUserProf', userProf)
        })
      }
    })
  },
  methods: {
    ...mapActions(['setUser']),
    loginCheck(e) {
      this.$store.commit('clearAuthError')
      this.error.emailBg = '#e3f2fd'
      this.error.passwordBg = '#e3f2fd'
      this.error.displayNameBg = '#e3f2fd'
      // alert('loginCheck')
      // this.$store.commit('clearAuthError')

      // this.$store.commit('setAuthError', 'passowrd required.')
      // this.$store.commit('setAuthError', 'Email required.')

      // alert(this.isAuthError)

      // this.errors = []
      if (!this.password) {
        this.$store.commit('setAuthError', 'パスワードは必須です。')
        this.error.passwordBg = '#f8bbd0'
      } else if (this.password.length < 8) {
        this.$store.commit('setAuthError', 'パスワードは８文字以上です。')
        this.error.passwordBg = '#f8bbd0'
      }
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
      if (this.register) {
        alert('reg')
        if (!this.displayName) {
          alert('reg error')
          this.$store.commit('setAuthError', 'ユーザー名は必須です。')
          this.error.displayNameBg = '#f8bbd0'
        } else if (this.displayName.length > 31) {
          this.$store.commit('setAuthError', 'ユーザー名は３０文字以下です。')
          this.error.displayNameBg = '#f8bbd0'
        }
      }
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
      // if (!this.formIsValidSignin) {
      //   return
      // }
      // if (!this.formIsValidLogin) {
      //   return
      // }
      // if (!this.image) {
      //   return
      // }
      this.isWaiting = true
      if (this.register) {
        console.log('signin')
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((res) => {
            console.log('createUserWithEmailAndPassword')
            const user = firebase.auth().currentUser
            console.log('uid: ' + user.uid)
            console.log('email: ' + user.email)
            console.log('displayName: ' + this.displayName)
            return user
          })
          .then((user) => {
            console.log('firebase auth add user')
            console.log('uid: ' + user.uid)
            console.log('email: ' + user.email)
            console.log('displayName: ' + this.displayName)
            this.$store.dispatch(ADD_REGISTORY, {
              uid: user.uid,
              email: user.email,
              displayName: this.displayName
            })
          })
          .then((user) => {
            const lp = '/about'
            this.link_commit(lp)
            this.isWaiting = false
          })
          .catch((error) => {
            // alert('signin error' + error)
            console.log('signin error' + error)
            this.isWaiting = false
            this.$store.commit('setAuthError', error)
          })
      } else {
        console.log('login email pass')
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            const lp = '/about'
            this.link_commit(lp)
            this.isWaiting = false
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
  border: 1px solid black;
}
.auth {
  display: block;
  width: 100%;
  border: 1px solid red;
}
.login-type-sellect{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
//   padding: 2rem 0.5rem;
  @media (min-width: 768px) {
    // padding: 8rem 8rem;
    flex-direction: row;
  }
}
.login-type{
  
  width: 100%;
  padding: 1rem 0.2rem;
  @media (min-width: 1024px) {
    width: 50%;
    padding: 2rem 2rem;
  }
   border: 1px solid green;
}
.login-type-wrap{
    width: 100%;
    height: 30rem;
    border-radius: 4px;
    background-color: rgb(204, 204, 204);
    cursor: pointer;
    padding: 1rem 0.5rem;
    @media (min-width: 1024px){
        padding: 2rem 2rem;
        height: 25rem;
    }
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
