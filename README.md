# nuxt-univ-create-gae-todo-base  
github repository: nuxt-univ-create-gae-todo-base  
gcp project: nuxt-univ-create-gae-todo  
  
```
$ npx create-nuxt-app <project-name>
 
create-nuxt-app v2.8.0 
Generating Nuxt.js project in  D:\develop-github\nuxt\create-nuxt-univ\nuxt-univ-create-gae-hosting\nuxt-univ-gae-app 
? Project name nuxt-univ-gae-app 
? Project description My spectacular Nuxt.js project 
? Author name hiramatsu 
? Choose the package manager Npm 
? Choose UI framework None 
? Choose custom server framework None (Recommended) 
? Choose Nuxt.js modules Axios 
? Choose linting tools ESLint, Prettier 
? Choose test framework None 
? Choose rendering mode Universal (SSR) 
```

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

# Google Cloud Platform
## app.yaml設置
ユニバーサル Nuxt アプリケーションを App Engine にデプロイするために追加する必要があるのは、app.yaml というファイルだけです。ルートプロジェクトディレクトリにその名前の新しいファイルを作成し、次の内容を追加します:
```
runtime: nodejs10

instance_class: F1

handlers:
  - url: /_nuxt
    static_dir: .nuxt/dist/client
    secure: always

  - url: /(.*\.(gif|png|jpg|ico|txt))$
    static_files: static/\1
    upload: static/.*\.(gif|png|jpg|ico|txt)$
    secure: always

  - url: /.*
    script: auto
    secure: always

env_variables:
  HOST: '0.0.0.0'
  NODE_ENV: 'production'

```
 
## App Engine
 1. GCPのコンソールから新しいプロジェクトを作成する。
 ```
 プロジェクト名: nuxt-univ-gae-app
 ```
 2. リージョンの選択する。
 ```
 リージョンを選択してください。: asia-northeast1
 ```
 3. 使用言語を選択する。
 ```
 node.js
 ```
 4. Cloud SDK を初期化する。
```
 $ gcloud init
 
 
Welcome! This command will take you through the configuration of gcloud.

Settings from your current configuration [default] are:
core:
  account: hiramatsu3300@gmail.com
  disable_usage_reporting: 'False'

Pick configuration to use:
 [1] Re-initialize this configuration [default] with new settings
 [2] Create a new configuration
Please enter your numeric choice:  1

Your current configuration has been set to: [default]

You can skip diagnostics next time by using the following flag:
  gcloud init --skip-diagnostics

Network diagnostic detects and fixes local network connection issues.
Checking network connection...done.
Reachability Check passed.
Network diagnostic passed (1/1 checks passed).

Choose the account you would like to use to perform operations for
this configuration:
 [1] hiramatsu3300@gmail.com
 [2] Log in with a new account
Please enter your numeric choice:  1

You are logged in as: [hiramatsu3300@gmail.com].

Pick cloud project to use:
 [1] angular2todo1
 [2] crafty-centaur-245706
 [3] gallery-a89f1
 [4] linear-reason-139903
 [5] midyear-respect-156706
 [6] myapp-8d883
 [7] mychat-ed85a
 [8] mytest-f1d0d
 [9] mytodo-26418
 [10] ng-auth-master
 [11] nuxt-app-6f771
 [12] nuxt-app2
 [13] nuxt-app3
 [14] nuxt-univ-gae-app
 [15] nuxt-univ-gae-hosting
 [16] oauth2-d0bf7
 [17] oauth3-11020
 [18] oauth4-9b520
 [19] Create a new project
Please enter numeric choice or text value (must exactly match list
item):  14

Your current project has been set to: [nuxt-univ-gae-app].

Not setting default zone/region (this feature makes it easier to use
[gcloud compute] by setting an appropriate default value for the
--zone and --region flag).
See https://cloud.google.com/compute/docs/gcloud-compute section on how to set
default compute region and zone manually. If you would like [gcloud init] to be
able to do this for you the next time you run it, make sure the
Compute Engine API is enabled for your project on the
https://console.developers.google.com/apis page.

Created a default .boto configuration file at [C:\Users\Owner\.boto]. See this file and
[https://cloud.google.com/storage/docs/gsutil/commands/config] for more
information about configuring Google Cloud Storage.
Your Google Cloud SDK is configured and ready to use!

* Commands that require authentication will use hiramatsu3300@gmail.com by default
* Commands will reference project `nuxt-univ-gae-app` by default
Run `gcloud help config` to learn how to change individual settings

This gcloud configuration is called [default]. You can create additional configurations if you work with multiple accounts and/or projects.
Run `gcloud topic configurations` to learn more.

Some things to try next:

* Run `gcloud --help` to see the Cloud Platform services you can interact with. And run `gcloud help COMMAND` to get help on any gcloud command.
* Run `gcloud topic --help` to learn about advanced features of the SDK like arg files and output formatting
```
5. ビルドする。
```
$ npm run build
```
6. デプロイする。
```
 $ gcloud app deploy
  
   
Services to deploy:

descriptor:      [D:\develop-github\nuxt\create-nuxt-univ\nuxt-univ-create-gae-hosting\nuxt-univ-gae-app\app.yaml]
source:          [D:\develop-github\nuxt\create-nuxt-univ\nuxt-univ-create-gae-hosting\nuxt-univ-gae-app]
target project:  [nuxt-univ-gae-app]
target service:  [default]
target version:  [20190705t124603]
target url:      [https://nuxt-univ-gae-app.appspot.com]


Do you want to continue (Y/n)?  y

Beginning deployment of service [default]...
Created .gcloudignore file. See `gcloud topic gcloudignore` for details.
#============================================================#
#= Uploading 53 files to Google Cloud Storage               =#
#============================================================#
File upload done.
Updating service [default]...done.
Setting traffic split for service [default]...done.
Deployed service [default] to [https://nuxt-univ-gae-app.appspot.com]

You can stream logs from the command line by running:
  $ gcloud app logs tail -s default

To view your application in the web browser run:
  $ gcloud app browse
```
7. ブラウザで確認する。
```
$ gcloud app browse
```
8. うまく表示されない場合は、ログを確認する。
```
$ gcloud app logs tail -s default
```












# nuxt.config.js setting
> nuxt.config.jsでの導入時の設定
# eslint
フォーマットエラー対応
✖ 7 problems (7 errors, 0 warnings) 
  7 errors, 0 warnings potentially fixable with the `--fix` option. 
  
Solved adding fix option in nuxt.config.jsfile: 
```
extend(config, ctx) {
    if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
            enforce : 'pre',
            test    : /\.(js|vue)$/,
            loader  : 'eslint-loader',
            exclude : /(node_modules)/,
            options : {
                fix : true
            }
        });
    }
}
```
ex.https://github.com/nuxt/nuxt.js/issues/1628 
```
options: {
fix: true
       }
```
 
 ***
# Firebaseの設定
# dotenv を使って環境変数を設定し、Firebaseのconfigで使う。
1. dotenvをインストール 
```
$ npm i @nuxtjs/dotenv
```
2. nuxt.config.jsを編集する 
`nuxt.config.js`
```
export default {
  modules: [
    '@nuxtjs/dotenv'
  ],
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASEURL: process.env.FIREBASE_DATABASEURL,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
  },
}
```
3. .envをルートディレクトリに作りキーを設定する。 
`.env`
```
FIREBASE_API_KEY='<key>'
FIREBASE_AUTH_DOMAIN='oauth3.firebaseapp.com'
FIREBASE_DATABASEURL='https://oauth3.firebaseio.com'
FIREBASE_PROJECTID='oauth3'
FIREBASE_STORAGEBUCKET='oauth3.appspot.com'
```
4. Firebase configにprocess.envを使って設定をする。
`plugins/firebase.js`
```
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
 
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET
}
 
if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}
 
export default firebase

```
  

## firesbase Vuexfire 
参考サイト 
https://qiita.com/h-orito/items/10119bcd202b596b8b6d 
https://qiita.com/wataruoguchi/items/8fdda8e9754658be06be 
 
1. Firebase と VuexFire をインストールする。
```
$ npm install vue firebase vuexfire@next --save
```
2. nuxt.config.jsを設定しプラグインを使えるようにする。
`nuxt.config`
```
export default {
plugins: [
    '~/plugins/firebase'
  ],
}
```
3. NuxtのpuluginディレクトリにFirebase.jsを作る。
`plugins/firebase.js`
```
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: '<key>',
  authDomain: 'oauth3.firebaseapp.com',
  databaseURL: 'https://oauth3.firebaseio.com',
  projectId: 'oauth3',
  storageBucket: 'oauth3.appspot.com'
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

export default firebase
```
4. store/actionType.jsに追加削除の関数を設定する。
`store/actionTypes.js`
```
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const INIT_TODO = 'INIT_TODO'
```

5. store/index.jsにvuexfireを使うように編集する。
`store/index.js`
```
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { ADD_TODO, REMOVE_TODO, INIT_TODO } from './actionTypes'

const db = firebase.database()
const itemsRef = db.ref('todos')
console.log('db: ' + itemsRef)

export const state = () => ({
  items: [], 
})

export const mutations = {
  ...vuexfireMutations
}

export const actions = {
  [INIT_TODO]: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('items', itemsRef, { wait: true })
  }),
  [ADD_TODO]: firebaseAction((context, text) => {
    itemsRef.push(text)
  }),
  [REMOVE_TODO]: firebaseAction((context, key) => {
    itemsRef.child(key).remove()
  })
}

export const getters = {
  getItems: (state) => {
    return state.items
  }
}

```
6. pages/indexでFirebaseからデータを表示する。
`pagese/index.vue`
```
<template>
  <div class="container">
      <section>
        <h2>asyncData</h2>
        <h3><pre>App Datas: {{ jsonAll }}</pre></h3>
      </section>
      <section>
        <h2>firebase</h2>
        <h3><pre>items: {{ items }}</pre></h3>
        <input v-model="todoText" type="text" style="color:black" @keyup.enter="addTodoFirebase">
        <li v-for="item in items" :key="item.key">
          {{ item.title }}
          <button style="color: black" @click="removeTodoFirebase(item['.key'])">
            del
          </button>
        </li>
      </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { ADD_TODO, REMOVE_TODO, INIT_TODO } from '~/store/actionTypes'
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      todoText: ''
    }
  },
  created() {
    this.$store.dispatch(INIT_TODO)
  },
  computed: {
    ...mapState(['items'])
  },
  methods: {
    addTodoFirebase() {
      this.$store.dispatch(ADD_TODO, { title: this.todoText, done: false })
      this.todoText = ''
    },
    removeTodoFirebase(key) {
      this.$store.dispatch(REMOVE_TODO, key)
    },
  }
}
</script>

```
## firebase strageを使う

## auth
https://qiita.com/yusuke-asaoka/items/54dd6c933bb07787cbd1
1. google認証
`pages/index.vue`
```
<template>
  <div class="container">
      <section>
        <h3>Google Login</h3>
        <div v-if="isWaiting">
          <p>読み込み中</p>
        </div>
        <div v-else>
          <div v-if="!isLogin">
            <button style="color:black" @click="googleLogin">
              Googleでログイン
            </button>
          </div>
          <div v-else>
            <p>{{ user.email }}でログイン中</p>
            <button style="color:black" @click="logOut">
              ログアウト
            </button>
          </div>
        </div>
      </section> 
    </div>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
export default {
  asyncData() {
    return {
      // google login
      isWaiting: true,
      isLogin: false,
      user: [],
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
        console.log('login')
      } else {
        this.isLogin = false
        this.user = []
        console.log('logout')
      }
    })
  },
  methods: {
    google login
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>
```
2. パスワード認証
`pages/index.vue`
```
<template>
  <div class="container">
        <section>
          <h3>Google Auth mail</h3>
          <div v-if="isWaiting">
            <p>読み込み中</p>
          </div>
          <div v-else>
            <div v-if="!isLogin">
              <div>
                <p>
                  <input
                    v-model="email"
                    style="color:black"
                    type="text"
                    placeholder="email"
                  >
                </p>
                <p>
                  <input
                    v-model="password"
                    style="color:black"
                    type="password"
                    placeholder="password"
                  >
                </p>
                <p>
                  <input
                    id="checkbox"
                    v-model="register"
                    style="color:black"
                    type="checkbox"
                  >
                  <label for="checkbox">新規登録</label>
                </p>
                <button style="color:black" @click="passwordLogin">
                  {{ register ? '新規登録' : 'ログイン' }}
                </button>
                <p>{{ errorMessage }}</p>
              </div>
            </div>
            <div v-else>
              <p>{{ user.email }}でログイン中</p>
              <button style="color:black" @click="logOut">
                ログアウト
              </button>
            </div>
          </div>
        </section>
    </div>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
export default {
  asyncData() {
    return {
      isWaiting: true,
      isLogin: false,
      user: [],
      register: false,
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
        console.log('login')
      } else {
        this.isLogin = false
        this.user = []
        console.log('logout')
      }
    })
  },
  methods: {
    passwordLogin() {
      const email = this.email
      const password = this.password
      if (this.register) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
          const errorMessage = error.message
          this.errorMessage = errorMessage
        }.bind(this))
      } else {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
          const errorMessage = error.message
          this.errorMessage = errorMessage
        }.bind(this))
      }
    },
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>
```
  
    


# cssプロパティ 
sass を利用したい場合は node-sass および sass-loader パッケージをインストールしてください。 
1. install 
```
npm install --save-dev node-sass sass-loader
```
2. nuxt.config　setting 
```
export default {
  css: [
    // プロジェクト内の SCSS ファイル
    '@/assets/sass/styles.scss'
  ]
}
```
3. component style setting 
~~~
    <style scoped lang="scss">
    </style>
~~~
 
# SASS変数をvueファイルで使う 
importの記述なしで使う。
1. install 
```
npm install --save @nuxtjs/style-resources
```
`注意`
 --save-dev にするとgoogle app engineへデプロイ時にnot foundでエラーになる。package.jsonのdevDependenciesではエラー 
  
2. nuxt.config setting 
```
modules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    sass: [
      '~/assets/sass/variable.scss',
    ],
  },
```
3. usage 
```
<style scoped lang="scss">
//@import "../../../assets/scss/common/data/thema.scss";
.container {
    color: $text-color
}
</style>
```
# autoprefixer の設定をカスタマイズする
Nuxt.js で CSS(Sass) をコンパイルすると、 autoprefixer がベンダープレフィクスを自動で適用してくれます。 
1. nuxt.config setting 
```
build: {
  postcss: [
    require('autoprefixer')({
      browsers: ['IE 11', 'last 2 versions' ],
      grid: true
    })
  ]
}

```
2. autoprefixer デフォルト設定 
```
1%, last 2 versions, Firefox ESR
```
1%:1%以上のシェアがあるブラウザ 
last 2 versions:最後の2バージョンのブラウザ 
Firefox ESR:最新のFirefox ESR版  
3.対応ブラウザの確認
https://browserl.ist/?q=%3E+1%25%2C+last+2+versions%2C+Firefox+ESR 
  
参考ページ:https://parashuto.com/rriver/tools/using-custom-data-for-autoprefixer 

# Google Analytics
1. install 
```
npm install --save @nuxtjs/google-analytics
```
2.アナリティクスのトラッキング IDを設定する 
```
modules: [
  ['@nuxtjs/google-analytics', { id: 'UA-xxxxx-x' }],
],
```
# Google Serch Colsole
1. Google Serch Colsoleからメタタグを取得
2. nuxt.config setting
```
head: {
   
    meta: [
      { name: "google-site-verification",
        content: "TaWpD9i4R5GSPzJjnTc8--t-g8bbDKbfxQX-e1kgio0" },
    ],
  },
```

# Nuxt.jsで静的ファイル生成時にサイトマップも自動生成する方法
npm run generateで静的ウェブサイトを生成 
1. install 
```
npm install --save @nuxtjs/sitemap
```
2. nuxt.config.js setting 
```
modules: [
    '@nuxtjs/sitemap',
  ],
  sitemap: {
    // path: '/sitemaps.xml',//Default: sitemaps.xml
    hostname: 'https://romantic-kare-6d357c.netlify.com/',
    generate: true,
    // exclude: [
    //   '/admin'
    // ],
    routes:[
      "/",
      {
        url: '/works',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: '2017-06-30T13:30:00.000Z'
      },
      "/about",
      "/contact"
    ]
  },
```
各パラメーターについて
path
生成されるサイトマップファイルの名前。
generateオプションでdirを変更していなければ、distフォルダの中に生成される。

hostname
サイト名。

generate
nuxt generate時に静的なサイトマップファイルを生成するかの設定。
ここをtrueにしておかないとサイトマップファイルが生成されないので注意。

exclude
サイトマップに含めたくないRULを指定できる。
管理者ページなどがある場合に使用する。

routes
サイトマップに含めるURLを追加する。
基本的にはgenerateオプションのroutesと同じように記述すればOK
上のコードはAPIから記事の一覧を取得して、記事毎のURLをroutesに追加する例。



***
# markdown
1. markdown-itをインストール 
```
$ npm i @nuxtjs/markdownit
```
2. nuxt.configに設定を追記 
```
markdownit: {
    preset: 'default'
    injected: true, 
    breaks: true, 
    html: true, 
    linkify: true,
    typography: true, 
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight: function (/*str, lang*/) { return ''; },
  },
```
3. $md を使ってパースする場合
オプションのinjected:trueに設定すると、$mdという変数が使えます。
```
<template>
  <div v-html="$md.render(model)"></div>
</template>

<script>
export default {
  data() {
    return {
      model: '# Hello World!'
    }
  }
}
</script>
```
4. .mdファイルを使ってパースする場合
```
<template>
  <div v-html="sample"></div>
</template>

<script>
  import sample from '../sample.md'

  export default {
    computed: {
      sample() {
        return sample
      }
    }
  }
</script>
```
ex:https://techblog.scouter.co.jp/entry/2019/01/24/190000 

# eslintrc.js
## console.logの使用
`eslintrc.js`
```
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
```
# layouts
> layouts ディレクトリ関連 
## カスタムレイアウト
1. layouts ディレクトリに新規レイアウト(layouts/topPage.vue)を作成を作成する。 
```
    <template>
    <div class="topPage">
        <HeaderNav />
        <nuxt />
    </div>
    </template>
    <script>
    import HeaderNav from '~/components/header/HeaderNav.vue'
    export default {
    layout: 'topPage',
    components: {
        HeaderNav
    }
    }
    </script>
    <style scoped lang="scss">
    </style>

```
2. ページ (pages/works/index.vue ) で、カスタムレイアウトを使うことを伝えます
```
<script>
export default {
  layout: 'topPage',
}
</script>

```

***
# components
> componentsディレクトリ関連 

***
# page
> pageディレクトリ関連 
## transition プロパティ
1. 特定のページ遷移のトランジション 
```
export default {
  transition: 'content'
}
```
```
//コンテンツ全体をスライド
.content-slide-enter-active, .content-slide-leave-active {
    transition: all 1s;
}
.content-slide-enter, .content-slide-leave-to {
    transform: translateX(100vw) ;
}
```
2. すべてのページ遷移のトランジション 
```
//アプリケーションのすべてのページでフェードさせるトランジション
 .page-enter-active, .page-leave-active {
     transition: opacity .5s;
 }
 .page-enter, .page-leave-to {
     opacity: 0;
 }

```
## head メソッド
1. 個別のページへのHTMLのheadタグを設定する 
```
<script>
export default {
  data() {
    return {
      pageTitle: 'Works Content'
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        // `hid` は一意の識別子として使用されます。 `vmid` は動作しないので使わないでください。
        { hid: 'description',
          name: 'Works by Nuxt.js',
          content: 'このページは、Vue.jsフレームワークのNuxt.jsを使って作成したWebサイトを紹介しています。' }
      ]
    }
  },
}
</script>
```
***
# store
> storeディレクトリ関連  
## モジュールモード
`store/index.js`
```
export const state = () => ({
  page: 'home'
})

export const mutations = {

  pagePathSet(state, payload) {
    state.page = payload
  },
}
```
`pages/works/index.vue`
```
<template>
  <div class="container">
    <div class="content-footer">
      <nav class="links">
        <a class="menu_link" @click="link_commit('/works')">
          WORKS
        </a>
        <a class="menu_link" @click="link_commit('/about')">
          ABOUT
        </a>
        <a class="menu_link" @click="link_commit('/contact')">
          CONTACT
        </a>
      </nav>
    </div>
  </div>
</template>
<script>
  computed: {
    page() {
      return this.$store.state.page
    }
  },
  methods: {
    link_commit(linkPath) {
      this.$store.commit('pagePathSet', linkPath)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
      }, 500)
    }
  }
}
</script>
```

# GitHub 
## GitHub リポジトリの作成 
1. GitHub ログイン後のトップページから、Repositories の New ボタンをクリックします。 
2. Create a new repository の画面に遷移するので、リポジトリ名、ライセンス等を入力。Initialize this repository with a READMEはチェックせず画面下のほうにある Create repository ボタンをクリックします。 
 
## プロジェクトを GitHub に Push する 
1. git add -A 
2. git commit -m "first commit" 
3. git remote add origin https://github.com/hiramatsuYoshiaki/プロジェクト名 
4. git push -u origin master 

## 現在のブランチから派生ブランチを作成してGitHubへPushする。  
1. git branch new-branch 
2. git checkout new-branch 
3. git branch 
   * new-branch 
     master 
4. git add -A 
5. git commit -m 'new branch commit' 
6. git push --set-upstream origin new-branch 
   (もしくは、　git push -u origin new-branch) 

## GitHubリポジトリをcloneしてローカルプロジェクト作る 
1. リモートリポジトリをcloneする。 
```
    git clone https://github.com/hiramatsuYoshiaki/nuxt-univ-create-gae-hosting.git  
```
2. インストールする  
```
    npm install  
```
3. サーバーを立ち上げて確認    
```
   npm run dev
```
4. ローカルサーバーへアクセス 
```
   http://localhost:3000/で確認する。 
```

## ローカルプロジェクトをGitHubへpushする。 
```
1. 現在のブランチを確認する。
   git branch  
   * master  
```
2. masterから新しいbranchを作る  
```
　　git branch new-branch   
```
3. 新しいbranchに移動し開発を行う。 
``` 
   git checkout new-branch  
   ```
4. cloneしたリポジトリから別のリモートリポジトリのURLを変更する場合  
```
    git remote -v
    origin  https://github.com/hiramatsuYoshiaki/vue-cli3-unit.git (fetch)  
    origin  https://github.com/hiramatsuYoshiaki/vue-cli3-unit.git (push)  
    git remote rm originで現在のリモートリポジトリを削除する  
    git remote add originで新しいリモートリポジトリを追加する   
    git remote add origin https://github.com/hiramatsuYoshiaki/vue-cli3-unit-alprime.git
```
5. コミットしてGitHubにpushする  
```
   git add　-A  
   git commit -m "コメント"  
   git push -u origin new-branch  
```  

## localでいままで作業していたbranchを削除する 
  1.これで削除できます。これはしなくてもいいですが、開発が進んでいくとbranchが増えてbranch一覧がごちゃごちゃしてくるのでやったほうがいいです。  
  ```
  git branch -d new-branch  
  ```

## 他の人の開発分を取り込む 
1. masterに他の人が追加した分を自分のところに取り込みます。 
```
  git pull origin master  
```
   
# vuex-persistedstateを使う 
1. インストール
`
$ npm install -S vuex-persistedstate
`
 
2. plugins/persistedstate.jsを作る 
`persistedstate.js`
`
import createPersistedState from "vuex-persistedstate";
    
export default ({store, isHMR}) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) return;
    
  if (process.client) {
    window.onNuxtReady((nuxt) => {
      createPersistedState()(store); // vuex plugins can be connected to store, even after creation
    });
  }
};
 
`
3. nuxt.config.jsを編集
`nuxt.config.js`
`
plugins: [
    { src: "~plugins/persistedstate.js", ssr: false }
  ]
`
 
### localStorageでstoreを永続化する 
 nuxt.jsで再読込しても入力中の内容を保持できる。
### localstorageに保存が可能になるとどうなる 
1. 再読込しても、storeの状態を保つことができます。 
2. 入力中のフォームの内容や、画面の状態を復元することができます。 
3. store中のstateはlocalstorageを消し去らないと新しい値とかを追加しても状態が変わらなくなってしまいます。 
### Nuxtの利点であるSSRもできるという点とは相性が悪い 
SSR実行時のnodeにはlocalstorageがありませんから、window.localstorageはさわれません。
そのため、今回のプラグインも{... , ssr; false}として、SSR時は起動しないようにする必要があります。




