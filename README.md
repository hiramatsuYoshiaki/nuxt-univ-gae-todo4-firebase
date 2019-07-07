# nuxt-univ-create-gae-hosting 
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

# app.yaml設置
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
 
# Google Cloud Platform
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



