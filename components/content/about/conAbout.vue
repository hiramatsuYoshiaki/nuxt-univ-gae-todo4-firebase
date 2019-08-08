<template>
  <div class="content">
    <!-- <p>e-mail:{{ email }}</p>
    <p>uid:{{ uid }}</p> -->

    <h6>Firebase CRUD</h6>
    <h2>
      Photo Todos
    </h2>
    <p>インスタグラムで見る、こんな写真を撮ってみたい！</p>
    <div v-for="(reg, index) in regstar" :key="index">
      <p>{{ reg.displayName }}さんのTodosリスト</p>
    </div>
    <!-- <button @click="reload">
      インスタグラムを読み込む
    </button> -->

    <section class="todo-list">
      <div class="todo-list-header">
        <span>Todo List </span>
        <!-- <span @click="isAddList = !isAddList"> -->
        <span @click="addTodoList()">
          <i class="material-icons add-list function-icon">playlist_add</i>
        </span>
      </div>

      <transition name="fade05">
        <div v-if="isAddList" class="new-todo-add">
          <div class="new-todo-add-wrap">
            <div class="add-new-form">
              <p class="modal-title">
                TODO LIST に追加する
              </p>
              <form novalidate @submit.prevent="addTodo">
                <div v-if="addTodoErrors.length" class="error-grp">
                  <p class="error-title">
                    入力項目を確認してください。
                  </p>
                  <ul>
                    <li v-for="(error, index) in addTodoErrors" :key="index">
                      <p class="error-msg">
                        {{ error }}
                      </p>
                    </li>
                  </ul>
                </div>
                <p class="modal-msg">
                  {{ message }}
                </p>
                <p>写真を撮りたいスポット</p>
                <p>
                  <input
                    v-model="text"
                    type="text"
                    placeholder="スポット"
                    :style="{ background: error.testBg }"
                  />
                </p>
                <p>インスタグラムの写真のURL</p>
                <p>
                  <input
                    v-model="insUrl"
                    type="url"
                    placeholder="インスタ写真のURL"
                    :style="{ background: error.insUrlBg }"
                  />
                </p>
                <div class="add-btn">
                  <button type="submit">
                    <p class="modai-button">
                      Todoリストに追加する
                    </p>
                  </button>
                </div>
              </form>
              <div class="modal-close" @click="isAddList = false">
                <i class="material-icons">
                  close
                </i>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <div class="flex-container ">
        <div v-for="(item, index) in items" :key="item.key">
          <div v-if="!item.done" class="ins-group ">
            <div class="like-spot">
              <div class="like-spot-header">
                <span class="like-spot-title">
                  {{ item.title }}
                </span>
                <span
                  class="function-icon-more-vert"
                  @click="moreActive(index)"
                >
                  <i class="material-icons">more_vert</i>
                </span>
                <transition name="fade05">
                  <div v-if="isMore && selectMore === index" class="more-vert">
                    <span class="function-icon" @click="addActionPhoto(index)">
                      <i class="material-icons">add_a_photo</i>
                      <span class="function-text">新規追加</span>
                    </span>
                    <span
                      class="function-icon"
                      @click="editActionPhoto(index, item)"
                    >
                      <i class="material-icons">edit</i>
                      <span class="function-text">編集</span>
                    </span>
                    <span
                      class="function-icon"
                      @click="removeTodoFirebase(item['.key'])"
                    >
                      <i class="material-icons">delete_forever</i>
                      <span class="function-text">削除</span>
                    </span>
                    <span
                      v-if="item.done"
                      class="function-icon"
                      @click="fullActive(index)"
                    >
                      <i class="material-icons">
                        fullscreen
                      </i>
                      <span class="function-text">画像拡大</span>
                    </span>
                  </div>
                </transition>
              </div>
              <blockquote
                class="instagram-media"
                :data-instgrm-permalink="item.insUrl"
                data-instgrm-version="12"
                style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
              >
                <a
                  :href="item.insUrl"
                  style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;"
                  target="_blank"
                />
              </blockquote>
              <script async src="//www.instagram.com/embed.js" />
            </div>
            <transition name="fade05">
              <div v-if="isAction && index === selectIndex" class="action-spot">
                <div class="action-spot-wrap">
                  <div class="add-done-ins-form">
                    <form novalidate @submit.prevent="onCreate(item)">
                      <p class="modal-title">
                        DONE LIST に追加する
                      </p>
                      <div v-if="addTodoErrors.length" class="error-grp">
                        <p class="error-title">
                          入力項目を確認してください。
                        </p>
                        <ul>
                          <li
                            v-for="(error, index) in addTodoErrors"
                            :key="index"
                          >
                            <p class="error-msg">
                              {{ error }}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <p class="modal-msg">
                        {{ message }}
                      </p>
                      <p>私のインスタ写真を載せる</p>
                      <p>
                        <input
                          v-model="insDaneUrl"
                          type="url"
                          placeholder="私のインスタ写真URL"
                          :style="{ background: error.insDaneUrlBg }"
                        />
                      </p>
                      <div class="origin-photo-grp">
                        <div id="app">
                          <p>私のオリジナル写真を載せる</p>
                          <div
                            class="origin-photo-add"
                            :style="{ background: error.fileBg }"
                          >
                            <input
                              type="file"
                              class="selectBtn"
                              @change="onFileChange"
                            />
                          </div>

                          <img
                            v-show="imageUrl"
                            :src="imageUrl"
                            class="my-photo"
                          />
                        </div>
                      </div>
                      <div class="add-btn">
                        <button type="submit" class="selectBtn">
                          私のインスタを追加する。
                        </button>
                      </div>
                    </form>
                    <div class="modal-close" @click="isAction = false">
                      <i class="material-icons">
                        close
                      </i>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            <!-- edit -->
            <transition name="fade05">
              <div
                v-if="isEdit && index === selectIndexEdit"
                class="action-spot"
              >
                <div class="action-spot-wrap">
                  <div class="add-done-ins-form">
                    <form novalidate @submit.prevent="editTodo(item)">
                      <p class="modal-title">
                        LIST 修正する
                      </p>
                      <div v-if="addTodoErrors.length" class="error-grp">
                        <p class="error-title">
                          入力項目を確認してください。
                        </p>
                        <ul>
                          <li
                            v-for="(error, index) in addTodoErrors"
                            :key="index"
                          >
                            <p class="error-msg">
                              {{ error }}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <p class="modal-msg">
                        {{ message }}
                      </p>
                      <p>撮りたいスポット</p>
                      <p>
                        <input
                          v-model="editSpotName"
                          type="text"
                          :placeholder="item.title"
                          :style="{ background: error.editSpotNameBg }"
                        />
                      </p>
                      <div class="add-btn">
                        <button type="submit" class="selectBtn">
                          修正
                        </button>
                      </div>
                    </form>
                    <div class="modal-close" @click="isEdit = false">
                      <i class="material-icons">
                        close
                      </i>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            <!-- <div v-if="item.done" class="action-done">
              <br />
              <blockquote
                class="instagram-media"
                :data-instgrm-permalink="item.insDaneUrl"
                data-instgrm-version="12"
                style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
              >
                <a
                  :href="item.insUrl"
                  style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;"
                  target="_blank"
                />
              </blockquote>
              <script async src="//www.instagram.com/embed.js" />

              <transition name="fade05">
                <div class="origin-photo">
                  <img :src="item.imageUrl" alt="img" />
                </div>
              </transition>
            </div> -->
          </div>
        </div>
      </div>

      <!-- done################################################## -->
      <div class="todo-list-header">
        <span>Done List</span>
        <span class="function-icon" @click="foldDoneList">
          <i v-if="doneInsta" class="material-icons unfold">unfold_less</i>
          <i v-if="!doneInsta" class="material-icons unfold">unfold_more</i>
        </span>
      </div>
      <div v-show="doneInsta" class="flex-container ">
        <div v-for="(item, index) in items" :key="item.key">
          <div v-if="item.done" class="ins-group ">
            <div class="like-spot">
              <div class="like-spot-header">
                <span class="like-spot-title">
                  {{ item.title }}
                </span>
                <span
                  class="function-icon-more-vert"
                  @click="moreActive(index)"
                >
                  <i class="material-icons">more_vert</i>
                </span>
                <transition name="fade05">
                  <div v-if="isMore && selectMore === index" class="more-vert">
                    <span
                      v-if="!item.done"
                      class="function-icon"
                      @click="addActionPhoto(index)"
                    >
                      <i class="material-icons">add_a_photo</i>
                      <span class="function-text">新規追加</span>
                    </span>
                    <span
                      class="function-icon"
                      @click="editActionPhoto(index, item)"
                    >
                      <i class="material-icons">edit</i>
                      <span class="function-text">編集</span>
                    </span>
                    <span
                      class="function-icon"
                      @click="removeTodoFirebase(item['.key'])"
                    >
                      <i class="material-icons">delete_forever</i>
                      <span class="function-text">削除</span>
                    </span>
                    <span
                      v-if="item.done"
                      class="function-icon"
                      @click="fullActive(index)"
                    >
                      <i class="material-icons">
                        fullscreen
                      </i>
                      <span class="function-text">画像拡大</span>
                    </span>
                  </div>
                </transition>
              </div>
              <transition name="fade05">
                <div
                  v-if="isEdit && index === selectIndexEdit"
                  class="action-spot"
                >
                  <div class="action-spot-wrap">
                    <div class="add-done-ins-form">
                      <form novalidate @submit.prevent="editTodo(item)">
                        <p>編集する</p>
                        <div v-if="addTodoErrors.length">
                          <p class="error-title">
                            入力項目を確認してください。
                          </p>
                          <ul>
                            <li
                              v-for="(error, index) in addTodoErrors"
                              :key="index"
                            >
                              <p class="error-msg">
                                {{ error }}
                              </p>
                            </li>
                          </ul>
                        </div>
                        <p class="modal-msg">
                          {{ message }}
                        </p>
                        <p>撮りたいスポット</p>
                        <p>
                          <input
                            v-model="editSpotName"
                            type="text"
                            :placeholder="item.title"
                            :style="{ background: error.editSpotNameBg }"
                          />
                        </p>
                        <div class="add-btn">
                          <button type="submit" class="selectBtn">
                            修正
                          </button>
                        </div>
                      </form>
                      <div class="modal-close" @click="isEdit = false">
                        <i class="material-icons">
                          close
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>

              <!-- my insta -->
              <blockquote
                class="instagram-media"
                :data-instgrm-permalink="item.insDaneUrl"
                data-instgrm-version="12"
                style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
              >
                <a
                  :href="item.insUrl"
                  style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;"
                  target="_blank"
                />
              </blockquote>
              <script async src="//www.instagram.com/embed.js" />
              <!-- like insta -->
              <!-- <p>私がリスペクトした写真</p> -->
              <div class="my-data">
                <!-- <i class="material-icons">update</i>
                <i class="material-icons">category</i> -->
              </div>
              <div class="respect">
                <i class="material-icons">pageview</i>
                <span class="like-spot-title">
                  リスペクトした写真
                </span>
              </div>

              <blockquote
                class="instagram-media"
                :data-instgrm-permalink="item.insUrl"
                data-instgrm-version="12"
                style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
              >
                <a
                  :href="item.insUrl"
                  style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;"
                  target="_blank"
                />
              </blockquote>
              <script async src="//www.instagram.com/embed.js" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="isAddList || isAction || isEdit || isFull" class="modal-bg" />
  </div>
</template>

<script>
// import { mapState, mapGetters, mapMutations } from 'vuex'
import { mapState } from 'vuex'
import firebase from '@/plugins/firebase'
import {
  ADD_TODO,
  REMOVE_TODO,
  INIT_TODO,
  UPDATEDANE_TODO,
  CREATE_MYPHOTO,
  GET_REGISTORY,
  EDIT_TODO
} from '~/store/actionTypes'
// import firebase from '@/plugins/firebase'
export default {
  // head() {
  //   return {
  //     script: [
  //       { src: 'https//www.instagram.com/embed.js', async: 'true', ssr: false }
  //     ]
  //   }
  // },
  // props: {
  //   msg: {
  //     type: String,
  //     default: 'about'
  //   }
  // },
  data() {
    return {
      text: '',
      insUrl: '',
      insDaneUrl: '',
      imageUrl: '', // local fiel Adress
      image: null, // image data
      isAddList: false,
      isAction: false,
      selectIndex: 0,
      isEdit: false,
      selectIndexEdit: 0,
      editSpotName: '',
      insActive: false,
      uid: '',
      email: '',
      isMore: false,
      selectMore: 0,
      isFull: false,
      selectFull: 0,
      // isfoldeDoneList: false
      error: {
        testBg: '#e3f2fd',
        insUrlBg: '#e3f2fd',
        insDaneUrlBg: '#e3f2fd',
        fileBg: '#e3f2fd',
        editSpotNameBg: '#e3f2fd'
      }
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['items']),
    ...mapState(['regstar']),
    ...mapState(['addTodoErrors']),
    ...mapState(['message']),
    ...mapState(['doneInsta'])
  },
  created() {
    // firebase
    // this.$store.dispatch(INIT_TODO)
    // console.log('conponents/content/about/conAbout.vue created()')
    // if (process.browser) {
    // window.addEventListener('scroll', this.handleScroll)
    // }
    // sample code1-----------------------------------
    // var iframe = document.createElement('iframe');
    // iframe.onload = function() { alert('myframe is loaded'); }; // before setting 'src'
    // iframe.src = '...';
    // document.body.appendChild(iframe); // add it to wherever you need it in the document
    // sample code1-----------------------------------
    // sample code2-----------------------------------
    //   var iframe = document.createElement('iframe');
    // iframe.addEventListener('load', function() { console.log('loaded!'); });
    // document.getElementsByTagName('body')[0].appendChild(iframe);
    // sample code2-----------------------------------
    // test code
    // const iframe = document.createElement('iframe')
    // iframe.addEventListener('load', this.iframeLoaded)
    // if (process.browser) {
    //   document
    //     .createElement('iframe')
    //     .iframe.addEventListener('load', this.iframeLoaded)
    // }
    // if (process.browser) {
    //   require('external_library')
    // document
    //   .createElement('iframe')
    //   .iframe.addEventListener('load', this.iframeLoaded)
    // }
  },
  // destroyed () {
  //   window.removeEventListener('scroll', this.handleScroll);
  // },
  mounted() {
    this.$store.commit('clearAddTodoError')
    this.$store.commit('clearMessage')
    // console.log('conponents/content/about/conAbout.vue mounteded()')
    // this.$store.commit('clearAuthError')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('login')
        // console.log('about uid: ' + user.uid)
        // console.log('about email: ' + user.email)
        // console.log('displayName: ' + user.displayName)
        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: null
        }
        this.$store.commit('setUser', loginUser)

        // this.$store.dispatch(GET_REGISTORY, loginUser)

        // console.log('not setTimeout: ' + this.user) // ここだと取得できない
        setTimeout(() => {
          this.$store.dispatch(GET_REGISTORY, loginUser)
          // console.log('setTimeout: ' + this.user.uid) // ここだと取得できる
          // console.log('setTimeout: ' + this.user.email) // ここだと取得できる
          this.uid = this.user.uid
          this.email = this.user.email
          this.$store.dispatch(INIT_TODO, this.user.uid)
          // なにかしらの処理
        })
      } else {
        console.log('logout')
      }
    })
    // console.log(this.regstar[0].uid)
    // console.log('mounted check uid ' + this.user.uid)
    // this.$store.dispatch(INIT_TODO, this.regstar[0].uid)
    // this.$store.dispatch(INIT_TODO, this.user.uid)
    // this.$store.dispatch(INIT_TODO, this.regstar)
    // console.log('mounted')
    // location.href = '/about'
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   setTimeout(() => this.$nuxt.$loading.finish(), 10000)
    // })
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.insActive = true
    //   }, 0)
    // })
  },

  methods: {
    // iframeLoaded() {
    //   alert('iframe is loaded')
    // },
    handleScroll() {
      // this.scrollY = window.scrollY;
      // this.windowH = window.innerHeight;
      // this.sec1SelectTop = document.getElementById('sec1SelectTop').getBoundingClientRect().top + window.scrollY;
      // this.sec2SelectTop = document.getElementById('sec2SelectTop').getBoundingClientRect().top + window.scrollY;
    },
    addTodo() {
      this.$store.commit('clearAddTodoError')
      this.$store.commit('clearMessage')
      this.error.testBg = '#e3f2fd'
      this.error.insUrlBg = '#e3f2fd'

      if (!this.text) {
        this.$store.commit('setAddTodoError', 'スポットは必須です。')
        this.error.testBg = '#f8bbd0'
      } else if (this.text.length > 20) {
        this.$store.commit('setAddTodoError', 'スポットは２０文字以下です。')
        this.error.testBg = '#f8bbd0'
      }
      if (!this.insUrl) {
        this.$store.commit('setAddTodoError', 'URLは必須です。')
        this.error.insUrlBg = '#f8bbd0'
      } else if (!this.validUrl(this.insUrl)) {
        this.$store.commit('setAddTodoError', '無効なURL形式です。')
        this.error.insUrlBg = '#f8bbd0'
      }

      if (this.addTodoErrors.length) {
        // alert('validation error')
      } else {
        // alert('validation ok')
        this.addTodoFirebase()
      }
    },
    validUrl: (insUrl) => {
      /* eslint-disable */
      // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const re = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/
      /* eslint-disable */
      return re.test(insUrl)
    },

    async addTodoFirebase() {

      const addTodoNew = await this.$store.dispatch(ADD_TODO, {
        title: this.text,
        done: false,
        insUrl: this.insUrl,
        insDaneUrl: '',
        filename: '',
        imageUrl: '',
        shootDate: '',
        user: this.user.uid
      })
      console.log('dispatch(ADD_TODO)')
      this.text = ''
      this.insUrl = ''
      this.isAddList = false
      await location.reload(true)
      console.log('location.reload(true)')
      
    },
    // addTodoFirebase() {

    //   this.$store.dispatch(ADD_TODO, {
    //     title: this.text,
    //     done: false,
    //     insUrl: this.insUrl,
    //     insDaneUrl: '',
    //     filename: '',
    //     imageUrl: '',
    //     shootDate: '',
    //     user: this.user.uid
    //   })

    //   this.text = ''
    //   this.insUrl = ''
    //   this.isAddList = false
    //   location.reload(true)
      
    // },
    removeTodoFirebase(key) {
      const result = window.confirm('削除しますか？')
      if (result) {
        this.$store.dispatch(REMOVE_TODO, { key: key, user: this.user.uid })
        this.isMore = false
        location.reload(true)
      }
      // this.$store.dispatch(INIT_TODO)
      
    },
    updateDoneTodoFirebase(key) {
      // console.log('updateDaneTodoFirebase')
      // this.$store.dispatch(UPDATEDANE_TODO, key)
      this.$store.dispatch(UPDATEDANE_TODO, {
        key: key,
        // user: this.regstar[0].uid
        user: this.user.uid
      })
      location.reload(true)
      // location.href = '/about'
    },

    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.filename = files[0].name
      if (this.filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result // ローカルのアドレス
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0] // イメージデータ
    },

    // removeImage(e) {
    //   this.image = ''
    // },
    onCreate(item) {
      // alert('onCreate my photo check error')
      this.$store.commit('clearAddTodoError')
      this.$store.commit('clearMessage')
      this.error.insDaneUrlBg = '#e3f2fd'
      this.error.fileBg = '#e3f2fd'
      
      if (!this.insDaneUrl) {
        this.$store.commit('setAddTodoError', 'URLは必須です。')
        this.error.insDaneUrlBg = '#f8bbd0'
      } else if (!this.validUrl(this.insDaneUrl)) {
        this.$store.commit('setAddTodoError', '無効なURL形式です。')
        this.error.insDaneUrlBg = '#f8bbd0'
      }
      if(!this.image) {
         this.$store.commit('setAddTodoError', 'オリジナルイメージは必須です。')
         this.error.fileBg = '#f8bbd0'
      }

      if (this.addTodoErrors.length) {
        // alert('validation error')
      } else {
        // alert('validation ok')
        this.onCreateMyPhoto(item)
      }
      
    }, 

    async onCreateMyPhoto(item) {
      let dt = new Date()
      let year = dt.getFullYear() //年
      let month = dt.getMonth()+1 //1月が0、12月が11。そのため+1をする。
      let date = dt.getDate() //日
      let today = year + '-' + month + '-' + date
      const createDatas = {
        // firebase
        key: item['.key'],
        shootDate: today,
        done: true,
        title: item.title,
        insUrl: item.insUrl,
        insDaneUrl: this.insDaneUrl,
        filename: this.filename,
        imageUrl: '',
        // strage
        stargeImage: this.image,
        // user: this.regstar[0].uid
        user: this.user.uid
      }
      // console.log(createDatas.insDaneUrl)

      
      // this. createFile()
      const createPhoto = await this.$store.dispatch(CREATE_MYPHOTO, createDatas)
      console.log('CREATE_MYPHOTO dispach firebase update end')
      // alert('dispatch(CREATE_MYPHOTO, createDatas)')
      this.text = ''
      this.insUrl = ''
      this.isAction = false
      // location.href = '/about'
      // location.reload(true)
      await this.openDone()
      console.log('openDone()')
      // alert('dispatch(CREATE_MYPHOTO, createDatas)')
      await location.reload(true)
    },
 


    addTodoList(){
      this.isAddList = !this.isAddList
      this.text = ''
      this.insUrl = ''
      this.$store.commit('clearAddTodoError')
      this.$store.commit('clearMessage')
      this.error.testBg = '#e3f2fd'
      this.error.insUrlBg = '#e3f2fd'
    },
    
    moreActive(idx) {
      this.isMore = !this.isMore
      this.selectMore = idx
    },
    fullActive(idx) {
      this.isFull = !this.isFull
      this.selectFull = idx
      this.isMore = false
    },
    addActionPhoto(idx) {
      this.isAction = !this.isAction
      this.selectIndex = idx
      this.insDaneUrl = ''
      this.image = ''
      this.imageUrl = ''
      this.$store.commit('clearAddTodoError')
      this.$store.commit('clearMessage')
      this.error.insDaneUrlBg = '#e3f2fd'
      this.error.fileBg = '#e3f2fd'
      this.isMore = false
    },
    foldDoneList(){
      this.$store.commit('setDoneInsta')
      location.reload(true)   
   },
   openDone(){
     console.log('openDone')
     this.$store.commit('openDoneInsta')
      // location.reload(true)   
   },


    editActionPhoto(idx, item) {
      this.isEdit = !this.isEdit
      this.selectIndexEdit = idx
      this.editSpotName = item.title
      this.isMore = false
      this.$store.commit('clearAddTodoError')
      this.$store.commit('clearMessage')
      this.error.editSpotNameBg = '#e3f2fd'
    },
    editTodo(item){
      this.$store.commit('clearAddTodoError')
      this.$store.commit('clearMessage')
      this.error.editSpotNameBg = '#e3f2fd'

      if (!this.editSpotName) {
        this.$store.commit('setAddTodoError', 'スポットは必須です。')
        this.error.editSpotNameBg = '#f8bbd0'
      } else if (this.editSpotName.length > 20) {
        this.$store.commit('setAddTodoError', 'スポットは２０文字以下です。')
        this.error.editSpotNameBg = '#f8bbd0'
      }
      if (this.addTodoErrors.length) {

      } else {
        this.editTodoFirebase(item)
      }
    },
    async editTodoFirebase(item) {
      const result = window.confirm('修正しますか？')
      if (result) {
        const editDatas = {
          // firebase
          key: item['.key'],
          title: this.editSpotName,
          user: this.user.uid
        }
        const edit = await this.$store.dispatch(EDIT_TODO, editDatas)
      }
      this.isEdit = false
      location.reload(true)
    }
    // reload() {
    //   location.reload(true)
    //   this.insActive = true
    // }
  }
}
</script>

<style scoped lang="scss">
.content {
  position: relative;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  @media (min-width: 768px) {
    padding: 2rem 8rem;
  }
}
.flex-container {
  display: relative;
  // overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap:wrap;
  // flex-grow: 2;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
  }
  // border: 1px solid red;
}
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
input {
  color: #000;
}
button {
  color: #000;
}
img {
  display: block;
  width: 40rem;
  height: auto;
  border: 0.3rem solid #000;
  margin-bottom: 0.5rem;
}
.function-icon {
  cursor: pointer;
  vertical-align: top;
}
.add-list {
  font-size: 2.5rem;
  font-weight: 400;
}

.todo-list {
  margin: 2rem 0;
}
.todo-list-header {
  width: 100%;
  // height: 4rem;
}

.ins-group {
  // border: 1px solid red;
  margin-bottom: 2rem;
  padding: 1rem;
}
.ins-group-header {
  width: 326px;
  height: 7rem;
}
.like-spot {
  width: 326px;
  position:relative;
  // border: 1px solid green;

}
.like-spot-header {
  width: 326px;
}
.like-spot-title {
  width: 80%;
  overflow: hidden;
  display: inline-block;
  color: #212121;
  word-wrap: break-word;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.4rem;
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: 992px) {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.4rem;
  }
}
.function-icon-more-vert{
  position: absolute;
  top: 0;
  right: 0;
  margin-top:.2rem;
  cursor: pointer;
}
.function-icon{
  display: inline-block;
  text-align: right;
}
.more-vert{
  width:12rem;
  height: 12rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index:1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2.5rem .5rem 0 0;
  padding:  1rem;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  border:1px solid rgba(0, 0, 0, 0.2); 
  border-radius: 2px;
  // @media (min-width: 768px) {
  //   padding: 8rem 8rem;
  // }
}
.function-text{
    display: inline-block;
    font-size: 1rem;
    font-weight: 500;
    color:#212121;
    line-height: .8rem;
    padding-top:.8rem;
    vertical-align: top;
  }

.action-spot-photo {
  width: 10rem;
  height: auto;
}
.respect{
  margin-top: 2rem;
}
.origin-photo {
  position: fixed;
  z-index: 2;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.origin-photo-wrap{
  border:1px solid red;
  width:95%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

}
.origin-photo img {
  width: 95%;
  height: auto;
  @media (min-width: 768px) {
    width: 50%;
  }
}
.modal-close-img {
  position: absolute;
  bottom: 10%;
  right: 50%;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 3px;
  
  i {
    width: 2rem;
    height: 2rem;
    display: block;
    font-size: 2rem;
    line-height: 2rem;
    color: #fff;
  }
}
.new-todo-add,
.action-spot {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 5px;
}
.new-todo-add-wrap,
.action-spot-wrap {
  position: relative;
  margin: 5rem 2rem 0 2rem;
  padding: 2rem;
  background-color: rgba(250, 250, 250, 1);
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 90%;
  height: 70%;
  @media (min-width: 992px) {
    width: 50%;
    height: 50%;
  }
}
.add-new-form, 
.add-done-ins-form, 
.add-done-ins-form{
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 1rem;
  @media (min-width: 992px) {
  border: 1px solid gray;
  padding: 2rem;
  }
}
.add-new-form, 
.add-done-ins-form, 
.add-done-ins-form{
  p{
    font-weight: 400;
    font-size: 1rem;
    line-height: 1rem;
    @media (min-width: 992px) {
      font-weight: 400;
      font-size: 1rem;
      line-height: 1rem;
    }
  }
  
}
.error-grp{
  margin-bottom: 2rem;
}
.modal-title{
    font-weight: 600;
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 2rem;
    color: $footer-color-color;
  @media (min-width: 992px) {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1rem;
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
.modal-msg{
  font-weight: 600;
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 1rem;
    color: rgb(3, 146, 46);
    margin-left: 1rem;
  @media (min-width: 992px) {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1rem;
  }
}
.add-btn button{
    border: none;
    background-color: $footer-color-color;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    color: #fff;
     margin-top: 1em;
     outline: 0;
}
.modai-button{
 margin-top: .5rem;
}
.add-new-form, .add-done-ins-form{
  input{
    width: 100%;
    @media (min-width: 992px) {
     width: 100%; 
    }
  }
}

.add-done-ins-form{
  height:100%;
  width: 100%;
}

.modal-close {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  cursor: pointer;
  border: 1px solid #212121;
  border-radius: 3px;
  i {
    width: 1rem;
    height: 1rem;
    display: block;
    font-size: 1rem;
    line-height: 1rem;
    color: #212121;
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
.selectBtn {
  font-size: 1rem;
}
.origin-photo-grp{
  margin-top: 1rem;
}
.origin-photo-add{
  margin-top: 0rem;
  padding: .2rem  .2rem .5rem .2rem;
  border-top: 2px solid rgb(170, 170, 170);
  border-left: 2px solid rgb(170, 170, 170);
  border-right: 1px solid rgb(170, 170, 170);
  border-bottom: 1px solid rgb(170, 170, 170);

  // background-color:#e3f2fd;
}
.my-photo{
  display: block;
  width: 5rem;
  margin: 1rem 0;
  @media (min-width: 992px) {
     width: 8rem; 
  }
  height: auto;
  border: 1px solid #212121;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
 
}
.unfold{
  font-size: 2rem;
  line-height: 2rem;
  vertical-align: top;
  margin-top: .2rem;
  margin-left:-.2rem;
}

</style>
