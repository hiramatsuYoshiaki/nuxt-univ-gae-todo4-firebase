<template>
  <div class="worksIntro">
    <div class="flex-container">
      <div class="side-col">
        <p
          class="topMenu topMenu1"
          :class="{ activeTopMenu: selectMenu === 1 }"
          @click="menuActive(1)"
        >
          1.ローカルにプロジェクトを作る
        </p>
        <div v-if="selectMenu === 1" class="subMenu">
          <a href="#a1">
            <p>GitHub リモートリポジトリをcloneする。</p>
          </a>
          <a href="#a2">
            <p>GitHubに新規リポジトリを作成する。</p>
          </a>
        </div>
        <p
          class="topMenu topMenu1"
          :class="{ activeTopMenu: selectMenu === 2 }"
          @click="menuActive(2)"
        >
          2.アプリケーションの設定
        </p>
        <div v-if="selectMenu === 2" class="subMenu">
          <a href="#a3"> <p>app.yamlを作成する</p></a>
        </div>
        <p
          class="topMenu topMenu1"
          :class="{ activeTopMenu: selectMenu === 3 }"
          @click="menuActive(3)"
        >
          3.GCPにディプロイする
        </p>
        <div v-if="selectMenu === 3" class="subMenu">
          <a href="#a4"> <p>プロジェクトを作成する</p></a>
          <a href="#a5"> <p>Cloud SDK を初期化する</p></a>
          <a href="#a6"> <p>デプロイする。</p></a>
        </div>
      </div>

      <div class="main-col">
        <div class="topMain h1-res">
          1.ローカルにプロジェクトを作る
        </div>
        <div id="a1" />
        <div class="mainTitle">
          <div class="h3-res">
            GitHub リモートリポジトリをcloneする。
          </div>
        </div>

        <!-- <div class="mainDescription">
          <p>
            GitHub リモートリポジトリをcloneする。
          </p>
        </div> -->

        <div class="mainOperation">
          1. リモートリポジトリをcloneする。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd1)" />
          </div>
        </div>
        <div class="mainOperation">
          2. インストールする
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd2)" />
          </div>
        </div>
        <div class="mainOperation">
          3. サーバーを立ち上げて確認
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd3)" />
          </div>
        </div>
        <div class="mainOperation">
          4. ローカルサーバーへアクセス
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd4)" />
          </div>
        </div>
        <div id="a2" />
        <div class="mainTitle">
          <div class="h3-res">
            GitHubに新規リポジトリを作成する。
          </div>
        </div>

        <div class="mainOperation">
          1. GitHub ログイン後のトップページから、Repositories の New
          ボタンをクリックします。
        </div>

        <div class="mainOperation">
          2.Create a new repository
          の画面に遷移するので、リポジトリ名、ライセンス等を入力。Initialize
          this repository with a READMEはチェックせず画面下のほうにある Create
          repository ボタンをクリックします。
        </div>

        <div class="mainOperation">
          3. プロジェクトを GitHub に Push する
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd5)" />
          </div>
        </div>
        <div class="mainOperation">
          4. 現在のブランチから派生ブランチを作成してGitHubへPushする。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd6)" />
          </div>
        </div>

        <div class="topMain h1-res">
          2.アプリケーションの設定
        </div>
        <div id="a3" />
        <div class="mainTitle">
          <div class="h3-res">
            ルートプロジェクトディレクトリにapp.yamlをつくる。
          </div>
        </div>
        <div class="mainOperation">
          1. app.yamlをつくる
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd7)" />
          </div>
        </div>

        <div class="topMain h1-res">
          3.GCPにディプロイする
        </div>
        <div id="a4" />
        <div class="mainTitle">
          <div class="h3-res">
            GCP(Google Cloud Platform)に新規プロジェクトをつくり、Cloud
            SDKを使って、ディプロイする。
          </div>
        </div>
        <div class="mainOperation">
          1. GCPのコンソールから新しいプロジェクトを作成する。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd8)" />
          </div>
        </div>
        <div class="mainOperation">
          2. リージョンの選択する。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd9)" />
          </div>
        </div>
        <div class="mainOperation">
          3. 使用言語を選択する。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd10)" />
          </div>
        </div>
        <div id="a5" />
        <div class="mainTitle">
          <div class="h3-res">
            Cloud SDK
            をインストールしていなければ、インストールする。その後に、初期化する。
          </div>
        </div>
        <div class="mainOperation">
          1. Cloud SDK をインストール
        </div>

        <div class="mainOperation">
          2. Cloud SDK を初期化する。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd11)" />
          </div>
        </div>
        <div id="a6" />
        <div class="mainTitle">
          <div class="h3-res">
            ディプロイする前に、Nuxtアプリケーションをビルドする。
          </div>
        </div>
        <div class="mainOperation">
          1. アプリケーションをビルドする。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd12)" />
          </div>
        </div>
        <div class="mainOperation">
          2. デプロイする。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd13)" />
          </div>
        </div>
        <div class="mainOperation">
          3. ブラウザで確認する。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd14)" />
          </div>
        </div>
        <div class="mainOperation">
          4. ログを確認する。
        </div>
        <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd15)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //   props: {
  //     pageTitle: {
  //       type: String,
  //       default: 'a'
  //     },
  //   }
  data() {
    return {
      active: true,
      selectMenu: -1,
      cmd1: ` 
    $ git clone https://github.com/hiramatsuYoshiaki/nuxt-univ-create-gae-hosting.git
       `,
      cmd2: ` 
    $ npm install
                      `,
      cmd3: ` 
    $ npm run dev
                      `,
      cmd4: ` 
    http://localhost:3005/で確認する
                      `,
      cmd5: ` 
    $ git add -A 
    $ git commit -m "first commit" 
    $ git remote add origin https://github.com/hiramatsuYoshiaki/プロジェクト名 
    $ git push --set-upstream origin master 
                     `,
      cmd6: ` 
    $ git branch new-branch 
    $ git checkout new-branch 
    $ git branch 
      * new-branch 
        master
    $ git add -A
    $ git commit -m 'new branch commit'
    $ git push --set-upstream origin new-branch
                     `,
      cmd7: `
    runtime: nodejs10
    
    instance_class: F1
    
    handlers:
    - url: /_nuxt
      static_dir: .nuxt/dist/client
      secure: always
    
    - url: /(.*?.(gif|png|jpg|ico|txt))$
      static_files: static/?1
      upload: static/.?*.(gif|png|jpg|ico|txt)$
      secure: always
         
    - url: /.*
      script: auto
      secure: always

    env_variables:
        HOST: '0.0.0.0'
        NODE_ENV: 'production'

        `,
      cmd8: ` 
    プロジェクト名: nuxt-univ-gae-appを入力
                      `,
      cmd9: ` 
    リージョンを選択してください。: asia-northeast1を選択
                      `,
      cmd10: ` 
    node.jsボタンを押す。
                      `,
      cmd11: ` 
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

    Created a default .boto configuration file at [C:?Users?Owner?.boto]. See this file and
    [https://cloud.google.com/storage/docs/gsutil/commands/config] for more
    information about configuring Google Cloud Storage.
    Your Google Cloud SDK is configured and ready to use!

    * Commands that require authentication will use hiramatsu3300@gmail.com by default
    * Commands will reference project nuxt-univ-gae-app by default
    Run gcloud help config to learn how to change individual settings

    This gcloud configuration is called [default]. You can create additional configurations if you work with multiple accounts and/or projects.
    Run gcloud topic configurations to learn more.

    Some things to try next:

    * Run gcloud --help to see the Cloud Platform services you can interact with. And run gcloud help COMMAND to get help on any gcloud command.
    * Run gcloud topic --help to learn about advanced features of the SDK like arg files and output formatting
                      `,
      cmd12: ` 
    $ npm run build
                      `,
      cmd13: ` 
    $ gcloud app deploy 
     
    Services to deploy:
    
    descriptor:      [D:?develop-github?nuxt?create-nuxt-univ?nuxt-univ-create-gae-hosting?nuxt-univ-gae-app?app.yaml]
    source:          [D:?develop-github?nuxt?create-nuxt-univ?nuxt-univ-create-gae-hosting?nuxt-univ-gae-app]
    target project:  [nuxt-univ-gae-app]
    target service:  [default]
    target version:  [20190705t124603]
    target url:      [https://nuxt-univ-gae-app.appspot.com]
    
    
    Do you want to continue (Y/n)?  y
    
    Beginning deployment of service [default]...
    Created .gcloudignore file. See gcloud topic gcloudignore for details.
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
    
                      `,
      cmd14: ` 
    $ gcloud app browse
                      `,
      cmd15: ` 
    $ gcloud app logs tail -s default
                      `
    }
  },
  methods: {
    menuActive(index) {
      this.selectMenu = index
    }
  }
}
</script>
<style scoped lang="scss">
.worksIntro {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 2rem;
  @media (min-width: 768px) {
    padding: 8rem 8rem;
  }
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.flex-container {
  width: 100%;
  display: flex;
  //   flex-direction: column;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  //   @media (min-width: 768px) {
  //       flex-direction: row;
  //   };
}
.side-col {
  // background-color: rgb(187, 248, 187);
  width: 100%;
  display: none;
  @media (min-width: 992px) {
    width: 30%;
    display: block;
    padding-right: 5rem;
  }
  // padding-right: 8rem;
  // padding-bottom: 2rem;
  padding: 2rem;
  section {
    margin-bottom: 2rem;
  }
  // h3{
  //   color:#000000;
  //   font-weight: 600;
  // }
  p {
    color: rgb(70, 69, 69);
    font-size: 1.2rem;
    font-weight: 600;
  }
  // border: 1px solid  rgba(0,0,0,.2);
}
.main-col {
  width: 100%;
  @media (min-width: 992px) {
    width: 70%;
    padding-right: 10rem;
    padding: 2rem;
  }
  section {
    margin-bottom: 2rem;
  }
  // p{
  //   color:rgb(70, 69, 69);
  // }
  // background-color: rgb(245, 165, 165);
}
.topMenu {
  color: rgb(70, 69, 69);
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
}
.activeTopMenu {
  background-color: lightgreen;
  border-radius: 2px;
}
.subMenu {
  padding-left: 1.5rem;
}

.topMain {
  border-bottom: 1px solid green;
  margin: 6rem 2rem 2rem 0;
}
.mainTitle {
  margin: 2rem 2rem 2rem 2rem;
  @media (min-width: 992px) {
    margin: 6rem 2rem 2rem 2rem;
  }
}
.mainDescription {
  // p{
  //     color: gray;
  // }
  margin: 2rem 2rem 2rem 2rem;
}
.mainOperation {
  // p{
  //     color: gray;
  // }
  margin: 2rem 2rem 2rem 2rem;
}
.mainComandWrap {
  background-color: rgb(150, 159, 165);
  padding: 1rem;
  border-radius: 2px;
  // font-size: 1rem;
}
.mainComand {
  font-size: 1.6rem;
  line-height: 2.5rem;
}
.h1-res {
  color: rgb(5, 121, 5);
  font-weight: 700;
  font-size: 2rem;
  @media (min-width: 992px) {
    font-size: 4rem;
  }
}
.h3-res {
  margin-left: -2rem;
  padding-top: 2rem;
  color: rgb(53, 53, 53);
  font-weight: 700;
  font-size: 1.6rem;
  @media (min-width: 992px) {
    font-size: 2rem;
  }
}
p {
  color: rgb(70, 69, 69);
}
</style>
