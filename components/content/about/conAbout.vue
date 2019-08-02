<template>
  <div class="content">
    <div v-for="(reg, index) in regstar" :key="index">
      <p>{{ reg.displayName }}</p>
    </div>
    <p>e-mail:{{ email }}</p>
    <p>uid:{{ uid }}</p>

    <h6>Firebase CRUD</h6>
    <h2>
      Photo Todos
    </h2>
    <h6>インスタグラムで見る、次に写真を撮りに行ってみたいスポット</h6>
    <!-- <button @click="reload">
      reload
    </button> -->
    <!-- <div v-if="isAddList" class="new-todo-add">
      <div class="new-todo-add-wrap">
        <div class="add-new-form">
          <p>新しいスポットを追加する</p>
          <form novalidate @submit.prevent="addTodo">
            <div v-if="addTodoErrors.length">
              <p>Please correct the following error(s):</p>
              <ul>
                <li v-for="(error, index) in addTodoErrors" :key="index">
                  <p>
                    {{ error }}
                  </p>
                </li>
              </ul>
            </div>
            <p>写真を撮りたいスポット</p>
            <p>
              <input
                v-model="text"
                type="text"
                placeholder="写真を撮りたいスポット"
              />
            </p>
            <p>インスタグラムの写真のURL</p>
            <p>
              <input
                v-model="insUrl"
                type="url"
                placeholder="参考にしたいインスタ写真のURL"
              />
            </p>
            <div class="add-btn">
              <button type="submit">
                Todoリストに追加する
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
    </div> -->

    <section class="todo-list">
      <div class="todo-list-header">
        <span>Photo Todo List </span>
        <!-- <span @click="isAddList = !isAddList"> -->
        <span @click="addTodoList()">
          <i class="material-icons add-list function-icon">playlist_add</i>
        </span>
      </div>
      <!-- <div v-if="isAddList" class="new-todo-add">
        <div class="new-todo-add-wrap">
          <div class="add-new-form">
            <p>新しいスポットを追加する</p>
            <div class="modal-close" @click="isAddList = false">
              <i class="material-icons">
                close
              </i>
            </div>
          </div>
        </div>
      </div> -->
      <div v-if="isAddList" class="new-todo-add">
        <div class="new-todo-add-wrap">
          <div class="add-new-form">
            <p>新しいスポットを追加する</p>
            <form novalidate @submit.prevent="addTodo">
              <div v-if="addTodoErrors.length">
                <p>Please correct the following error(s):</p>
                <ul>
                  <li v-for="(error, index) in addTodoErrors" :key="index">
                    <p>
                      {{ error }}
                    </p>
                  </li>
                </ul>
              </div>
              <!-- <div v-if="message"> -->
              <p>{{ message }}</p>
              <!-- </div> -->
              <p>写真を撮りたいスポット</p>
              <p>
                <input
                  v-model="text"
                  type="text"
                  placeholder="写真を撮りたいスポット"
                />
              </p>
              <p>インスタグラムの写真のURL</p>
              <p>
                <input
                  v-model="insUrl"
                  type="url"
                  placeholder="参考にしたいインスタ写真のURL"
                />
              </p>
              <div class="add-btn">
                <button type="submit">
                  Todoリストに追加する
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
            <div
              v-if="isAction && !item.done && index === selectIndex"
              class="action-spot"
            >
              <div class="action-spot-wrap">
                <div class="add-done-ins-form">
                  <form @submit.prevent="onCreateMyPhoto(item)">
                    <p>私のインスタ写真を載せる</p>
                    <p>
                      <input
                        v-model="insDaneUrl"
                        type="url"
                        placeholder="私のインスタ写真URL"
                      />
                    </p>
                    <div>
                      <div id="app">
                        <p>私のオリジナル写真を載せる</p>
                        <img v-show="imageUrl" :src="imageUrl" />
                        <input
                          type="file"
                          class="selectBtn"
                          @change="onFileChange"
                        />
                      </div>
                      <!-- <div>imageUrl:{{ imageUrl }}</div>
                      <div>image:{{ image }}</div> -->
                    </div>

                    <div class="add-btn">
                      <button type="submit" class="selectBtn">
                        upload Done
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
            <div
              v-if="isEdit && !item.done && index === selectIndexEdit"
              class="action-spot"
            >
              <div class="action-spot-wrap">
                <div class="add-done-ins-form">
                  <form @submit.prevent="deitTodoFirebase(item)">
                    <p>編集する</p>
                    <p>
                      <input
                        v-model="editSpotName"
                        type="text"
                        :placeholder="item.title"
                      />
                    </p>
                    <div class="add-btn">
                      <button type="submit" class="selectBtn">
                        Edit Done
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

            <div v-if="item.done" class="action-done">
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
              <!-- <div>title:{{ item.title }}</div>
            <div>insDaneUrl:{{ item.insDaneUrl }}</div>
            <div>myPhoto:{{ item.filename }}</div>
            <div>myPhotoUrl:{{ item.imageUrl }}</div> -->
              <div class="origin-photo">
                <img :src="item.imageUrl" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- done################################################## -->
      <div class="todo-list-header">
        <span>Done Photo </span>
        <!-- <span @click="isAddList = !isAddList">
          <i class="material-icons add-list function-icon">playlist_add</i>
        </span> -->
      </div>
      <div class="flex-container ">
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
              </div>
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
            <!-- <div
              v-if="isAction && !item.done && index === selectIndex"
              class="action-spot"
             > -->
            <!-- <div class="action-spot">
              <div class="action-spot-wrap">
                <div class="add-done-ins-form"> -->
            <div v-if="isFull && index === selectFull" class="origin-photo">
              <div class="origin-photo-wrap">
                <img :src="item.imageUrl" alt="img" />
                <div class="modal-close-img" @click="isFull = false">
                  <i class="material-icons">
                    close
                  </i>
                </div>
              </div>
            </div>

            <!-- </div>
              </div>
            </div> -->

            <!-- <div
              v-if="isEdit && !item.done && index === selectIndexEdit"
              class="action-spot"
             >
              <div class="action-spot-wrap">
                <div class="add-done-ins-form">
                  <form @submit.prevent="deitTodoFirebase(item)">
                    <p>編集する</p>
                    <p>
                      <input
                        v-model="editSpotName"
                        type="text"
                        :placeholder="item.title"
                      />
                    </p>
                    <div class="add-btn">
                      <button type="submit" class="selectBtn">
                        Edit Done
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
            </div> -->

            <!-- <div v-if="item.done" class="action-done"> -->
            <!-- <br /> -->
            <!-- <blockquote
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
              <script async src="//www.instagram.com/embed.js" /> -->
            <!-- <div>title:{{ item.title }}</div>
              <div>insDaneUrl:{{ item.insDaneUrl }}</div>
              <div>myPhoto:{{ item.filename }}</div>
              <div>myPhotoUrl:{{ item.imageUrl }}</div> -->
            <!-- <div class="origin-photo">
                <img :src="item.imageUrl" alt="img" />
              </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="isAddList || isAction || isEdit || isFull"
      class="modal-bg"
    />
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
      // editItem: null,
      // editKey: '',
      editSpotName: '',
      insActive: false,
      uid: '',
      email: '',
      isMore: false,
      selectMore: 0,
      isFull: false,
      selectFull: 0
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['items']),
    ...mapState(['regstar']),
    ...mapState(['addTodoErrors']),
    ...mapState(['message'])
  },
  created() {
    // firebase
    // this.$store.dispatch(INIT_TODO)
    console.log('conponents/content/about/conAbout.vue created()')

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
    console.log('conponents/content/about/conAbout.vue mounteded()')
    // this.$store.commit('clearAuthError')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('login')
        console.log('about uid: ' + user.uid)
        console.log('about email: ' + user.email)
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
      if (!this.text) {
        this.$store.commit('setAddTodoError', 'スポットは必須です。')
      } else if (this.text.length > 20) {
        this.$store.commit('setAddTodoError', 'スポットは２０文字以下です。')
      }
      if (!this.insUrl) {
        this.$store.commit('setAddTodoError', 'URLは必須です。')
      } else if (!this.validUrl(this.insUrl)) {
        this.$store.commit('setAddTodoError', '無効なURL形式です。')
      }

      if (this.addTodoErrors.length) {
        alert('validation error')
      } else {
        alert('validation ok')
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
    addTodoFirebase() {
      // const createDatas = {
      //   title: this.createTitle,
      //   filename: this.filename,
      //   done: false,
      //   image: this.image
      // }
      this.$store.dispatch(ADD_TODO, {
        title: this.text,
        done: false,
        insUrl: this.insUrl,
        insDaneUrl: '',
        filename: '',
        imageUrl: '',
        shootDate: '',
        // user: this.regstar[0].uid
        user: this.user.uid
      })
      // this.$store.dispatch(ADD_TODO, createDatas)
      this.text = ''
      this.insUrl = ''
      // this.$store.dispatch(INIT_TODO)
      // location.reload()
    },
    removeTodoFirebase(key) {
      const result = window.confirm('削除しますか？')
      if (result) {
        this.$store.dispatch(REMOVE_TODO, { key: key, user: this.user.uid })
      }
      // this.$store.dispatch(INIT_TODO)
      // location.reload()
    },
    updateDoneTodoFirebase(key) {
      // console.log('updateDaneTodoFirebase')
      // this.$store.dispatch(UPDATEDANE_TODO, key)
      this.$store.dispatch(UPDATEDANE_TODO, {
        key: key,
        // user: this.regstar[0].uid
        user: this.user.uid
      })
      // location.reload()
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

    removeImage(e) {
      this.image = ''
    },

    onCreateMyPhoto(item) {
      // alert('onCreateMeetup')
      // alert('key: ' + item['.key'])

      // console.log('insDaneUrl: ' + this.insDaneUrl)
      // console.log('onCreateMeetup title: ' + this.filename)
      // console.log(this.imageUrl)
      // console.log(this.image)
      const createDatas = {
        // firebase
        key: item['.key'],
        shootDate: '2019-07-20',
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
      this.$store.dispatch(CREATE_MYPHOTO, createDatas)
      // location.reload()
    },
    addTodoList(){
      this.isAddList = !this.isAddList
      this.text = ''
      this.insUrl = ''
      alert('clearAddTodoError')
      this.$store.commit('clearAddTodoError')
    },
    
    moreActive(idx) {
      this.isMore = !this.isMore
      this.selectMore = idx
    },
    fullActive(idx) {
      this.isFull = !this.isFull
      this.selectFull = idx
    },
    addActionPhoto(idx) {
      this.isAction = !this.isAction
      this.selectIndex = idx
    },
    editActionPhoto(idx, item) {
      this.isEdit = !this.isEdit
      this.selectIndexEdit = idx
      this.editSpotName = item.title
    },
    deitTodoFirebase(item) {
      const result = window.confirm('修正しますか？')
      if (result) {
        const editDatas = {
          // firebase
          key: item['.key'],
          title: this.editSpotName,
          user: this.user.uid
        }
        this.$store.dispatch(EDIT_TODO, editDatas)
      }
      this.isEdit = false
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
    padding: 8rem 8rem;
  }
}
.flex-container {
  display: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap:wrap;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
  }
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
p {
  color: #212121;
  word-wrap: break-word;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.8rem;
  @media (min-width: 992px) {
    font-weight: 400;
    font-size: 2rem;
    line-height: 2.6rem;
  }
}
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
// .new-todo-add {
// margin: 2rem 0;
// padding: 1rem;
// border: 1px solid gray;
// h5 {
//   margin: 1rem -1rem;
//   color: #000;
//   display: inline-block;
//   line-height: 3rem;
//   background-color: lightseagreen;
// }
// }
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
    color:gray;
    line-height: .8rem;
    padding-top:.8rem;
    vertical-align: top;
  }

.action-spot-photo {
  width: 10rem;
  height: auto;
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
  margin: 2rem 2rem;
  padding: 1rem;
  border: 1px solid gray;
  background-color: rgba(250, 250, 250, 1);
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;
  padding: 2rem;
  width: 90%;
  @media (min-width: 992px) {
    width: 50%;
  }
}

.modal-close {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
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
</style>
