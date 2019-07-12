<template>
  <div class="content">
    <h2>Firebase CRUD</h2>
    <section>
      <span>Photo Todos:</span>
      <!-- <pre>items: {{ items }}</pre> -->
      <input v-model="todoText" type="text" @keyup.enter="addTodoFirebase" />
      <li v-for="item in items" :key="item.key">
        <div>{{ item.title }}</div>
        <div>{{ item.done }}</div>
        <div>{{ item.filename }}</div>
        <div>{{ item.imageUrl }}</div>
        <img :src="item.imageUrl" alt="img" />
        <!-- <button style="color: black" @click="removeTodoFirebase(item['.key'])"> -->
        <!-- del -->
        <!-- </button> -->
        <button @click="removeTodoFirebase(item['.key'])">
          del
        </button>
      </li>
    </section>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { ADD_TODO, REMOVE_TODO, INIT_TODO } from '~/store/actionTypes'

// import firebase from '@/plugins/firebase'

export default {
  // props: {
  //   msg: {
  //     type: String,
  //     default: 'about'
  //   }
  // },
  data() {
    return {
      todoText: ''
    }
  },
  created() {
    // firebase
    this.$store.dispatch(INIT_TODO)
  },
  computed: {
    // firebase
    ...mapState(['items'])
  },
  methods: {
    addTodoFirebase() {
      this.$store.dispatch(ADD_TODO, { title: this.todoText, done: false })
      this.todoText = ''
    },
    removeTodoFirebase(key) {
      this.$store.dispatch(REMOVE_TODO, key)
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
</style>
