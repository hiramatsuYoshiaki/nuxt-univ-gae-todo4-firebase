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
          <h2>User Mail</h2>
          <p>User Mail Reset ボタンを押してください。</p>
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
            <p>Email: {{ email }}</p>
            <p>User Name: {{ displayName }}</p>
            <p>
              <input
                v-model="newEmail"
                type="text"
                placeholder="新しいメールアドレス"
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
            <div class="add-btn">
              <button type="submit">
                User Mail Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { GET_REGISTORY } from '~/store/actionTypes'
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
      newEmail: null,
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
        alert('mounted login now')
        alert(
          ' user.uid: ' +
            user.uid +
            ' user.email: ' +
            user.email +
            ' user.displayName: ' +
            user.displayName
        )
        this.email = user.email
        this.displayName = user.displayName
        console.log('uid: ' + user.uid)
        console.log('email: ' + user.email)
        console.log('displayName: ' + user.displayName)
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
        })
      } else {
        alert('再ログインしてください。')
        this.link_commit('/loginEmail')
      }
    })
  },
  methods: {
    mailReset() {
      alert('mail reset')
      const user = firebase.auth().currentUser

      if (user) {
        const isOk = window.confirm('メールアドレスを変更しますか？')
        if (isOk) {
          user
            .updateEmail(this.newEmail)
            .then(() => {
              console.log('email reset send email')
            })
            .catch((error) => {
              console.log('firebase auth error' + error)
              // this.$store.commit('/auth', null)
            })
          // const actionCodeSettings = {
          //   url: 'http://' + window.location.host + '/userMailSetting',
          //   handleCodeInApp: false
          // }
          // user
          //   .sendEmailVerification(actionCodeSettings)
          //   .then(() => {
          //     console.log('email reset send email')
          //   })
          //   .catch((error) => {
          //     console.log('firebase auth error' + error)
          //   })
        }
      } else {
        this.$store.commit('/auth', null)
      }

      //       user.updateEmail("user@example.com").then(function() {
      //   // Update successful.
      // }).catch(function(error) {
      //   // An error happened.
      // });

      //       var user = firebase.auth().currentUser;

      // user.sendEmailVerification().then(function() {
      //   // Email sent.
      // }).catch(function(error) {
      //   // An error happened.
      // });
    },
    ...mapActions(['setUser']),
    loginCheck(e) {
      alert('loginCheck newEmail: ' + this.newEmail)
      this.$store.commit('clearAuthError')
      this.error.emailBg = '#e3f2fd'
      this.error.passwordBg = '#e3f2fd'
      this.error.displayNameBg = '#e3f2fd'
      // if (!this.password) {
      //   this.$store.commit('setAuthError', 'パスワードは必須です。')
      //   this.error.passwordBg = '#f8bbd0'
      // } else if (this.password.length < 8) {
      //   this.$store.commit('setAuthError', 'パスワードは８文字以上です。')
      //   this.error.passwordBg = '#f8bbd0'
      // }
      if (!this.newEmail) {
        this.$store.commit('setAuthError', 'メールは必須です。')
        this.error.emailBg = '#f8bbd0'
      } else if (!this.validEmail(this.newEmail)) {
        this.$store.commit('setAuthError', '無効なメール形式です。')
        this.error.emailBg = '#f8bbd0'
      }
      if (this.newEmail.length > 30) {
        this.$store.commit('setAuthError', 'メールは３０文字以下です。')
        this.error.emailBg = '#f8bbd0'
      }
      // if (this.register) {
      // alert('displayName')
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
        // this.login()
        // this.finishSingUp()
        // this.userSet()
        this.mailReset()
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
    validEmail: (email) => {
      /* eslint-disable */
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      /* eslint-disable */
      return re.test(email)
    },
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
    userSet() {
      alert('userSet displayName: ' + this.newEmail)
      alert('再認証')
      // const credential = firebase.auth.EmailAuthProvider.credential(this.email, this.password);
       
  // const { user } = await firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
      // let user = firebase.auth().currentUser;
      // let credential;
      var credential = firebase.auth.EmailAuthProvider.credential(
          this.email,
          this.password
      );
      firebase.auth().currentUser.reauthenticateWithCredential(credential)
      // firebase
      //   .auth()
      //   .currentUser
      //   .reauthenticateAndRetrieveDataWithCredential(credential)
        .then((result) => {
          console.log('再認証 完了')
          const user = firebase.auth().currentUser
          // this.$store.dispatch(ADD_REGISTORY, {
          //   uid: user.uid,
          //   email: user.email,
          //   displayName: this.displayName
          // })
          return user
        })
        .then((user) => {
          console.log('updateEmai')
          user.updateEmail(this.newEmail);
          return user
        })
        
        // .then((user) => {
        //   console.log('new Email currentUser')
        //   const newuser = firebase.auth().currentUser
        //   return newuser
        // })
        .then((user) => {
          console.log('sendEmailVerification')
          firebase.auth().languageCode = 'jp'
          const actionCodeSettings = {
            url: 'http://' + window.location.host + '/userMailSetting',
            handleCodeInApp: true
          }
          console.log('userMailSetting')
          user.sendEmailVerification(actionCodeSettings)
        })
      //   .then((result) => {
      //     this.link_commit('/about')
      //   })
        .catch((error) => {
          console.log('login error' + error)
        })

      // メアド変更
  // await firebase.auth().currentUser.updateEmail(email);
 
  // idToken更新
  // await firebase.auth().currentUser.getIdToken(true);
 
  // 確認メールの送信
  // await firebase.auth().currentUser.sendEmailVerification({
  //   url: 'https://example.com/setting/email',
  //   handleCodeInApp: false,
  // });
      // firebase
      //   .auth()
      //   .currentUser.updateEmail(this.newEmail)
      //   .then((result) => {
      //     const user = firebase.auth().currentUser
      //     this.$store.dispatch(ADD_REGISTORY, {
      //       uid: user.uid,
      //       email: user.email,
      //       displayName: this.displayName
      //     })
      //   })
      //   .then((result) => {
      //     this.link_commit('/about')
      //   })
      //   .catch((error) => {
      //     console.log('login error' + error)
      //   })
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
