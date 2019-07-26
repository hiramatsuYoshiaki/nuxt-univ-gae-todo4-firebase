import { vuexfireMutations, firebaseAction } from 'vuexfire'
import {
  ADD_TODO,
  REMOVE_TODO,
  INIT_TODO,
  UPDATEDANE_TODO,
  CREATE_MYPHOTO
} from './actionTypes'
import firebase from '@/plugins/firebase'

const db = firebase.database()

export const state = () => ({
  page: 'home',
  items: [],
  user: null,
  reloadkey: 0
})
export const mutations = {
  pagePathSet(state, payload) {
    state.page = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  setReloadkey(state, payload) {
    state.reloadkey += 1
  },
  // firebase
  ...vuexfireMutations
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },

  [INIT_TODO]: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('items', db.ref('imgdatas'), { wait: true })
  }),
  [ADD_TODO]: firebaseAction((context, text) => {
    db.ref('imgdatas').push(text)
  }),
  [REMOVE_TODO]: firebaseAction((context, key) => {
    db.ref('imgdatas')
      .child(key)
      .remove()
  }),
  [UPDATEDANE_TODO]: firebaseAction((context, key) => {
    db.ref('imgdatas')
      .child(key)
      .update({ done: true })
  }),
  [CREATE_MYPHOTO]: (context, createDatas) => {
    console.log('CREATE_MYPHOTO')
    // firebase
    // key: item['.key'],
    // shootDate: '2019-07-20',
    // done: true,
    // title: item.title,
    // insUrl: item.insUrl,
    // insDaneUrl: this.insDaneUrl,
    // filename: this.filename,
    // imageUrl: '',
    // // strage
    // stargeImage: this.imageUrl
    const imgDatas = {
      shootDate: createDatas.shootDate,
      done: createDatas.done,
      title: createDatas.title,
      filename: createDatas.filename,
      insUrl: createDatas.insUrl,
      insDaneUrl: createDatas.insDaneUrl,
      imageUrl: ''
    }
    // console.log(imgDatas.insDaneUrl)
    // console.log(imgDatas.filename)
    // console.log(imgDatas.image)
    // firebase strage rule
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read, write;
    //     }
    //   }
    // }
    const filename = createDatas.filename
    alert(filename)
    alert(createDatas.stargeImage)
    alert(imgDatas.title)
    firebase
      .storage()
      .ref('images/' + filename)
      .put(createDatas.stargeImage)
      .then((fileData) => {
        return firebase
          .storage()
          .ref('images/' + filename)
          .getDownloadURL()
      })
      .then((url) => {
        imgDatas.imageUrl = url
        // const updates = {}
        // updates['imgdatas/' + createDatas.key] = imgDatas
        // db.ref().update(updates)
        db.ref('imgdatas')
          .child(createDatas.key)
          .update(imgDatas)
      })
      .catch((err) => {
        console.log('firebase error code: ' + err)
      })
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  }
}
