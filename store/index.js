import { vuexfireMutations, firebaseAction } from 'vuexfire'
import {
  ADD_TODO,
  REMOVE_TODO,
  INIT_TODO,
  UPDATEDANE_TODO,
  CREATE_MYPHOTO,
  ADD_REGISTORY,
  GET_REGISTORY
} from './actionTypes'
import firebase from '@/plugins/firebase'

const db = firebase.database()

export const state = () => ({
  page: 'home',
  items: [],
  user: null,
  reloadkey: 0,
  regstar: [],
  authErrors: []
  // isAuthError: false
})
export const mutations = {
  pagePathSet(state, payload) {
    state.page = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  // no use
  setReloadkey(state, payload) {
    state.reloadkey += 1
  },
  setAuthError(state, payload) {
    state.authErrors.push(payload)
    // state.isAuthError = true
  },
  clearAuthError(state) {
    state.authErrors = []
    // state.isAuthError = false
  },
  // firebase
  ...vuexfireMutations
}

export const actions = {
  // setUser({ commit }, payload) {
  //   commit('setUser', payload)
  // },

  [ADD_REGISTORY]: firebaseAction((context, user) => {
    console.log('dispatch ADD_REGISTORY')
    console.log('disp uid: ' + user.uid)
    console.log('disp email: ' + user.email)
    console.log('disp name: ' + user.displayName)
    db.ref('todoUser')
      .child(user.uid)
      .push(user)
  }),
  [GET_REGISTORY]: firebaseAction(({ bindFirebaseRef }, user) => {
    console.log('GET_REGISTORY uid: ' + user.uid)
    bindFirebaseRef('regstar', db.ref('todoUser/' + user.uid), {
      wait: true
    })
    console.log('GET_REGISTORY')
  }),

  [INIT_TODO]: firebaseAction(({ bindFirebaseRef }, user) => {
    console.log('INIT_TODO uid: ' + user)
    bindFirebaseRef('items', db.ref('imgdatas').child(user), {
      wait: true
    })
  }),
  [ADD_TODO]: firebaseAction((context, insdata) => {
    db.ref('imgdatas/' + insdata.user).push(insdata)
  }),
  [REMOVE_TODO]: firebaseAction((context, keydata) => {
    db.ref('imgdatas/' + keydata.user)
      .child(keydata.key)
      .remove()
  }),
  [UPDATEDANE_TODO]: firebaseAction((context, keydata) => {
    db.ref('imgdatas' + keydata.user)
      .child(keydata.key)
      .update({ done: true })
  }),
  // [INIT_TODO]: firebaseAction(({ bindFirebaseRef }) => {
  //   bindFirebaseRef('items', db.ref('imgdatas'), { wait: true })
  // }),
  // [ADD_TODO]: firebaseAction((context, text) => {
  //   db.ref('imgdatas').push(text)
  // }),
  // [REMOVE_TODO]: firebaseAction((context, key) => {
  //   db.ref('imgdatas')
  //     .child(key)
  //     .remove()
  // }),
  // [UPDATEDANE_TODO]: firebaseAction((context, key) => {
  //   db.ref('imgdatas')
  //     .child(key)
  //     .update({ done: true })
  // }),

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
    // alert(filename)
    // alert(createDatas.stargeImage)
    // alert(imgDatas.title)
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
        // db.ref('imgdatas')
        //   .child(createDatas.key)
        //   .update(imgDatas)
        db.ref('imgdatas/' + createDatas.user)
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
  // getUser(state) {
  //   console.log('getUser uid: ' + state.regstar.displayName)
  //   return !!state.regstar
  // }
}
