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
          <h2>Email User Delete</h2>
          <div v-if="isAuthenticated">
            <p>emai: {{ email }}</p>
            <p>loginUser: {{ displayName }}</p>
            <p>isAuthenticated: {{ isAuthenticated }}</p>
            <p>Deleteボタンを押してください。</p>

            <p>database User Prof</p>
            <div v-for="(reg, index) in regstar" :key="index">
              <p>DATABASES登録ユーザー名{{ reg.displayName }}さん</p>
              <p>key: {{ reg['.key'] }}</p>
            </div>

            <div class="login-form">
              <form novalidate @submit.prevent="loginCheck">
                <div v-if="authErrors.length">
                  <p class="error-title">
                    入力項目を確認してください。
                  </p>
                  <ul>
                    <li v-for="(error, index) in authErrors" :key="index">
                      <p class="error-msg">
                        {{ error }}
                      </p>
                    </li>
                  </ul>
                </div>
                <!-- <p>{{ email }}</p>
            <p>
              <input
                v-model="displayName"
                type="text"
                placeholder="ユーザー"
                required
                :style="{ background: error.displayNameBg }"
              />
            </p> -->
                <div class="add-btn">
                  <button type="submit">
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div v-else>
            <p>アカウントを削除するには、ログインが必要です。</p>
            <div class="add-btn">
              <button @click="link_commit('auth')">
                ログインページへ
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
import { GET_REGISTORY, REMOVE_REGISTORY } from '~/store/actionTypes'
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
        alert('mounted login now ok')
        alert(
          ' user.email: ' +
            user.email +
            ' user.displayName: ' +
            user.displayName
        )
        this.email = user.email
        this.displayName = user.displayName
        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: ''
        }
        this.$store.commit('setUser', loginUser)
        this.$store.dispatch(GET_REGISTORY, loginUser)

        console.log('not setTimeout: ' + this.user.email) // ここだと取得できない
        setTimeout(() => {
          console.log('setTimeout: ' + this.user.email) // ここだと取得できる
          // なにかしらの処理
        })
      } else {
        alert('mounted logout now XXX')
        this.email = null
        this.displayName = null
        // this.link_commit('/auth')
        //  this.$router.push({ path: '/auth' })
        // const loginUser = {
        //   uid: null,
        //   email: null,
        //   displayName: null
        // }
        this.$store.commit('setUser', null)
        // this.$store.dispatch(GET_REGISTORY, loginUser)
      }
    })
  },
  methods: {
    deleteUser() {
      const user = firebase.auth().currentUser
      if (user) {
        const isDel = window.confirm('削除しますか？')
        if (isDel) {
          user
            .delete()
            .then(() => {
              console.log('User deleted')
              console.log('dispatch UPDATEDANE_REGISTORY')
              //   const user = firebase.auth().currentUser
              let userkey = null
              for (const regItem of this.regstar) {
                // console.log(regItem['.key'])
                userkey = regItem['.key']
              }
              this.$store.dispatch(REMOVE_REGISTORY, {
                uid: user.uid,
                email: user.email,
                displayName: this.displayName,
                key: userkey
              })
            })
            .catch((error) => {
              console.log('firebase auth error' + error)
            })
        }
      } else {
        this.$store.commit('setUser', null)
      }
    },
    finishSingUp() {
      alert('sing up')
      //   メールリンクで使用するディープリンクの形式は、
      // 帯域外メール アクションで使用される形式
      // （メールアドレスの確認、パスワードのリセット、メールアドレスの変更取り消しなどで使用される形式）と同じです。
      // Firebase Auth は isSignInWithEmailLink API を提供することにより、
      // リンクがメールリンクによるログインかどうかを判断する作業を簡易にします。
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn')
        alert('isSignInWithEmailLink: ' + email)
        if (!email) {
          // ユーザにテキストを入力することを促すメッセージを持つダイアログを表示します。
          email = window.prompt('Please provide your email for confirmation')
        }
        // mail link
        // メールリンク ログインを完了する 1.ウェブページでログインを完了する
        // https://firebase.google.com/docs/auth/web/email-link-auth#before_you_begin
        // ログインを完了するには、signInWithEmailLink を呼び出し、
        // ワンタイム コードを含む実際のメールリンクとユーザーのメールアドレスを渡します。
        firebase
          .auth()
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn')
            const singUser = result.user
            const isNewUser = result.additionalUserInfo.isNewUser
            console.log(singUser)
            // const user = firebase.auth().currentUser
            // let nameUser, emailUser, photoUrlUser, uidUser, emailVerifiedUser
            // let nameUser, emailUser
            // if (user != null) {
            //   nameUser = user.displayName
            //   emailUser = user.email
            //   photoUrl = user.photoURL;
            //   emailVerified = user.emailVerified;
            //   uid = user.uid;
            // }
            if (isNewUser) {
              console.log('new--->signIn User email: ')
              this.link_commit('/userSet')
            } else {
              console.log('Login User email: ')
              this.link_commit('/about')
            }
          })
          // .then((result) => {
          //   this.link_commit('/about')
          // })
          .catch((error) => {
            console.log('signin error' + error)
          })
      }
    },
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
      // if (!this.password) {
      //   this.$store.commit('setAuthError', 'パスワードは必須です。')
      //   this.error.passwordBg = '#f8bbd0'
      // } else if (this.password.length < 8) {
      //   this.$store.commit('setAuthError', 'パスワードは８文字以上です。')
      //   this.error.passwordBg = '#f8bbd0'
      // }
      // if (!this.email) {
      //   this.$store.commit('setAuthError', 'メールは必須です。')
      //   this.error.emailBg = '#f8bbd0'
      // } else if (!this.validEmail(this.email)) {
      //   this.$store.commit('setAuthError', '無効なメール形式です。')
      //   this.error.emailBg = '#f8bbd0'
      // }
      // if (email.length < 4) {
      //     alert('Please enter an email address.');
      //     return;
      //   }
      // if (this.register) {
      // alert('displayName')
      // if (!this.displayName) {
      //   alert('reg error')
      //   this.$store.commit('setAuthError', 'ユーザー名は必須です。')
      //   this.error.displayNameBg = '#f8bbd0'
      // } else if (this.displayName.length > 31) {
      //   this.$store.commit('setAuthError', 'ユーザー名は３０文字以下です。')
      //   this.error.displayNameBg = '#f8bbd0'
      // }
      // }
      // console.log('error' + this.errors)
      // if (this.errors.length) this.login()
      // this.login()

      if (this.authErrors.length) {
        // alert('error')
      } else {
        // alert('normal')
        // this.login()
        this.deleteUser()
      }
      e.preventDefault()
    },
    // login() {
    //   console.log('login')
    //   this.isWaiting = true
    //   if (this.register) {
    //     console.log('signin')
    //     firebase
    //       .auth()
    //       .createUserWithEmailAndPassword(this.email, this.password)
    //       .then((res) => {
    //         console.log('createUserWithEmailAndPassword')
    //         const user = firebase.auth().currentUser
    //         console.log('uid: ' + user.uid)
    //         console.log('email: ' + user.email)
    //         console.log('displayName: ' + this.displayName)
    //         return user
    //       })
    //       .then((user) => {
    //         console.log('firebase auth add user')
    //         console.log('uid: ' + user.uid)
    //         console.log('email: ' + user.email)
    //         console.log('displayName: ' + this.displayName)
    //         this.$store.dispatch(ADD_REGISTORY, {
    //           uid: user.uid,
    //           email: user.email,
    //           displayName: this.displayName
    //         })
    //       })
    //       .then((user) => {
    //         const lp = '/about'
    //         this.link_commit(lp)
    //         this.isWaiting = false
    //       })
    //       .catch((error) => {
    //         // alert('signin error' + error)
    //         console.log('signin error' + error)
    //         this.isWaiting = false
    //         this.$store.commit('setAuthError', error)
    //       })
    //   } else {
    //     console.log('login email pass')
    //     firebase
    //       .auth()
    //       .signInWithEmailAndPassword(this.email, this.password)
    //       .then((user) => {
    //         const lp = '/about'
    //         this.link_commit(lp)
    //         this.isWaiting = false
    //       })
    //       .catch((error) => {
    //         // alert('login error' + error)
    //         console.log('login error' + error)
    //         this.isWaiting = false
    //         // this.errors.push('Invalid email .')
    //         this.$store.commit('setAuthError', error)
    //       })
    //   }
    // },
    // validEmail: (email) => {
    //   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   return re.test(email)
    // },
    // logout() {
    //   console.log('logout')
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //       this.$store.commit('setUser', null)
    //     })
    //     .catch((error) => {
    //     })
    // },
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
  padding: 2rem;
  border: 1px solid red;
}
.login-type-sellect {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.login-type {
  width: 100%;
  height: 100%;
  padding: 1rem 0.2rem;
  @media (min-width: 768px) {
    width: 50%;
    padding: 2rem 2rem;
  }
  border: 1px solid green;
}
.login-type-wrap {
  width: 100%;
  height: 25rem;
  border-radius: 4px;
  background-color: rgb(204, 204, 204);
  cursor: pointer;
  padding: 1rem 0.5rem;
  @media (min-width: 768px) {
    padding: 2rem 2rem;
    height: 15rem;
  }
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
