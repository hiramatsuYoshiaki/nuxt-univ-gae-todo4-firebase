<template>
  <div class="content">
    <h6>Firebase CRUD</h6>
    <h2>
      Photo Todos
    </h2>
    <h6>インスタグラムで見る、次に写真を撮りに行ってみたいスポット</h6>

    <!-- <i class="material-icons">
      add_circle_outline
    </i> -->
    <!-- <pre>items: {{ items }}</pre> -->
    <section v-if="isAddList" class="new-todo-add">
      <!-- <h5>Amazing spot I want to go take a picture</h5> -->
      <div class="add-new-form">
        <form @submit.prevent="addTodoFirebase">
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
      </div>
    </section>

    <section class="todo-list">
      <span>Photo Todo List </span>
      <!-- <i class="material-icons add-list">add_box</i> -->
      <span @click="isAddList = !isAddList">
        <i class="material-icons add-list function-icon">playlist_add</i>
      </span>

      <div v-for="item in items" :key="item.key">
        <div class="ins-group ">
          <div>
            {{ item.title }}
            {{ item.done }}

            <span class="function-icon" @click="isAction = !isAction">
              <i class="material-icons">photo_camera</i>
            </span>
            <span
              class="function-icon"
              @click="removeTodoFirebase(item['.key'])"
            >
              <i class="material-icons">delete_forever</i>
            </span>
          </div>
          <!-- <div>{{ item.insUrl }}</div> -->

          <div class="like-spot">
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
          </div>
          <div v-if="isAction && !item.done" class="action-spot">
            <p>私のインスタ写真を載せる</p>
            <div class="add-done-ins-form">
              <form @submit.prevent="onCreateMyPhoto(item)">
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
                    <input type="file" @change="onFileChange" />
                  </div>
                  <div>imageUrl:{{ imageUrl }}</div>
                  <div>image:{{ image }}</div>
                </div>

                <div class="add-btn">
                  <button type="submit">
                    upload Done
                  </button>
                </div>
              </form>
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
    </section>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapMutations } from 'vuex'
import { mapState } from 'vuex'
import {
  ADD_TODO,
  REMOVE_TODO,
  INIT_TODO,
  UPDATEDANE_TODO,
  CREATE_MYPHOTO
} from '~/store/actionTypes'

// import firebase from '@/plugins/firebase'

export default {
  // head() {
  //   return {
  //     script: [{ src: '//www.instagram.com/embed.js', async: 'true' }]
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
      isAction: false
    }
  },
  computed: {
    // firebase
    ...mapState(['items'])
  },
  created() {
    // firebase
    this.$store.dispatch(INIT_TODO)
  },

  methods: {
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
        shootDate: ''
      })
      // this.$store.dispatch(ADD_TODO, createDatas)
      this.text = ''
      this.insUrl = ''
      // this.$store.dispatch(INIT_TODO)
      location.reload()
    },
    removeTodoFirebase(key) {
      this.$store.dispatch(REMOVE_TODO, key)
      // this.$store.dispatch(INIT_TODO)
      location.reload()
    },
    updateDoneTodoFirebase(key) {
      // console.log('updateDaneTodoFirebase')
      this.$store.dispatch(UPDATEDANE_TODO, key)
      location.reload()
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
        stargeImage: this.image
      }
      // console.log(createDatas.insDaneUrl)
      this.$store.dispatch(CREATE_MYPHOTO, createDatas)
      location.reload()
    }
  }
}
</script>

<style scoped lang="scss">
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
.flex-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
h1 {
  margin-bottom: 2rem;
  color: rgb(31, 84, 209);
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.2rem;
  @media (min-width: 992px) {
    font-size: 4rem;
    line-height: 4.2rem;
  }
}
h3 {
  color: rgb(67, 110, 211);
  margin-bottom: 2rem;
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.2rem;
  @media (min-width: 992px) {
    font-size: 2rem;
    line-height: 2.2rem;
  }
}
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
.new-todo-add {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid gray;
  // h5 {
  //   margin: 1rem -1rem;
  //   color: #000;
  //   display: inline-block;
  //   line-height: 3rem;
  //   background-color: lightseagreen;
  // }
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

.ins-group {
  border: 1px solid gray;
  margin-bottom: 2rem;
  padding: 1rem;
}
.like-spot {
}
.action-spot {
}
.action-done {
}
.origin-photo {
  img {
    width: 20rem;
    height: auto;
  }
}
</style>
