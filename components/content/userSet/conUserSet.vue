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
          <h2>User Set</h2>
        </div>
        <div v-if="isAuthenticated">
          <p>emai: {{ email }}</p>
          <p>User Set ボタンを押してください。</p>
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
              <p>メール： {{ email }}</p>
              <p>ユーザー名： {{ displayName }}</p>
              <p>
                <input
                  v-model="displayName"
                  type="text"
                  placeholder="ユーザー名"
                  required
                  :style="{ background: error.displayNameBg }"
                />
              </p>
              <div class="add-btn">
                <button type="submit">
                  User Set
                </button>
              </div>
            </form>
            <div v-if="isUpdate">
              <ul class="guid-msg-wrape">
                <li v-for="(msg, index) in message" :key="index">
                  <p class="guid-msg">
                    {{ msg }}
                  </p>
                </li>
              </ul>
              <div class="add-btn" @click="link_commit('/auth')">
                <button>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>ログインしていません。</p>
          <div class="add-btn" @click="link_commit('/loginEmail')">
            <button>
              Email Password Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { UPDATEDANE_REGISTORY, GET_REGISTORY } from '~/store/actionTypes'
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
      isUpdate: false
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['regstar']),
    ...mapState(['authErrors']),
    // ...mapState(['userProf']),
    ...mapState(['message']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    alert('userSet mounted')
    this.isUpdate = false
    this.$store.commit('clearAuthError')
    this.$store.commit('clearMessage')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email
        this.displayName = user.displayName
        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: ''
        }
        this.$store.commit('setUser', loginUser)
        this.$store.dispatch(GET_REGISTORY, loginUser)
        // setTimeout(() => {
        //   console.log('setTimeout: ' + this.user.email) // ここだと取得できる
        // })
      } else {
        // alert('再ログインしてください。')
        this.email = null
        this.displayName = null
        this.$store.commit('setUser', null)
      }
    })
  },
  methods: {
    // ...mapActions(['setUser']),
    loginCheck(e) {
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
      if (!this.displayName) {
        alert('reg error')
        this.$store.commit('setAuthError', 'ユーザー名は必須です。')
        this.error.displayNameBg = '#f8bbd0'
      } else if (this.displayName.length > 31) {
        this.$store.commit('setAuthError', 'ユーザー名は３０文字以下です。')
        this.error.displayNameBg = '#f8bbd0'
      }
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
        this.userSet()
      }
      e.preventDefault()
    },

    userSet() {
      // alert('userSet displayName: ' + this.displayName)
      const user = firebase.auth().currentUser
      if (user) {
        user
          .updateProfile({
            displayName: this.displayName
          })
          .then((result) => {
            let userkey = null
            for (const regItem of this.regstar) {
              userkey = regItem['.key']
            }
            this.$store.dispatch(UPDATEDANE_REGISTORY, {
              uid: user.uid,
              email: user.email,
              displayName: this.displayName,
              key: userkey,
              registration: true
            })
          })
          .then(() => {
            // this.link_commit('/loginEmail')
            console.log('user set ok ')
            this.$store.commit('setMessage', 'ユーザー情報を更新しました。')
            this.isUpdate = true
          })
          .catch((error) => {
            console.log('login error' + error)
          })
      } else {
        alert('再ログインしてから、ユーザー情報をしてください。')
        this.email = null
        this.displayName = null
        this.$store.commit('setUser', null)
      }
    },
    link_commit(linkPath) {
      this.active = true
      this.$store.commit('pagePathSet', linkPath)
      setTimeout(() => {
        if (linkPath === '/mypage') {
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
  // border: 1px solid black;
}
.auth {
  display: block;
  width: 100%;
  padding: 2rem;
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
  padding: 0 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
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
.guid-msg-wrape {
  margin-top: 2rem;
}
.guid-msg {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 1rem;
  color: rgb(21, 134, 6);
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
