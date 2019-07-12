import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { ADD_TODO, REMOVE_TODO, INIT_TODO } from './actionTypes'
import firebase from '@/plugins/firebase'

const db = firebase.database()

export const state = () => ({
  page: 'home',
  items: []
})
export const mutations = {
  pagePathSet(state, payload) {
    state.page = payload
  },
  // firebase
  ...vuexfireMutations
}

export const actions = {
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
  })
}
