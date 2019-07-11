<template>
  <div class="content">
    <div class="con-title">
      <h1>GOOGLE APP ENGINE</h1>
      <h3>
        サービス型プラットフォーム
      </h3>
      <p>
        Platform as a Service（PaaS）
      </p>
      <p>
        GCP(Google Cloud
        Platform)のクラウドコンピューティングプロダクトの一つです。
      </p>
    </div>

    <h1>App Engine</h1>
    <p>
      App Engine によるマネージド プラットフォームでのビルド
    </p>

    <div class="quote-block">
      <blockquote class="quote">
        <i class="material-icons">
          format_quote
        </i>
        <p>
          GCP では、マネージドの Platform as a Service（PaaS）を Google App
          Engine と呼びます。App Engine
          でウェブサイトを構築すると、ユーザーは機能のコーディングに集中し、それを支えるインフラストラクチャの管理は
          Google に任せることができます。App Engine
          には、スケーラビリティ、負荷分散、ロギング、モニタリング、セキュリティを自分で構築したり管理したりするよりも大幅に簡素化できる、幅広い機能が用意されています。App
          Engine
          では、さまざまなプログラミング言語でコードを作成できます。また、他のさまざまな
          GCP サービスを使用することもできます。 App Engine
          は、アプリを安全なサンドボックス環境で実行できる、スタンダード環境を提供します。App
          Engine
          のスタンダード環境では、複数のサーバーにリクエストが分散され、トラフィック需要に合わせてサーバーがスケーリングされます。アプリは、ハードウェア、オペレーティング
          システムまたはサーバーの物理的な場所に依存しない、独自の安全かつ信頼できる環境内で実行されます。
        </p>
        <a
          href="https://cloud.google.com/solutions/web-serving-overview#app-engine"
          target="_blank"
        >
          <cite>Google Cloud</cite>
        </a>
      </blockquote>
    </div>

    <h1>Node.js ランタイム</h1>
    <h3>
      概要
    </h3>
    <div class="quote-block">
      <blockquote class="quote">
        <i class="material-icons">
          format_quote
        </i>
        <p>
          Node.js
          ランタイムは、アプリケーションのコードと依存関係をインストールして実行するソフトウェア
          スタックです。ランタイムは app.yaml で runtime: nodejs
          として宣言されます。
        </p>
        <p>
          runtime: nodejs
        </p>
        <p>
          env: flex
        </p>
        <p>
          フレキシブル環境のランタイムは、Docker
          を使用してビルドされています。Node.js ランタイムは Ubuntu 16.04
          がベースとなっていて、Node.js ランタイムのソースコードは GitHub
          で公開されています。
        </p>
        <a
          href="https://cloud.google.com/appengine/docs/flexible/nodejs/runtime"
          target="_blank"
        >
          <cite>Google Cloud</cite>
        </a>
      </blockquote>
    </div>
    <h3>
      パッケージ マネージャ
    </h3>
    <div class="quote-block">
      <blockquote class="quote">
        <i class="material-icons">
          format_quote
        </i>
        <p>
          デプロイ中には、ランタイムによって、npm または yarn パッケージ
          マネージャを介して依存関係がインストールされ、アプリケーションが起動されます。パッケージ
          マネージャは次のロジックに基づいています。
        </p>
        <p>
          ・yarn.lock ファイルがアプリケーションのルート
          ディレクトリに存在する場合は、ランタイムでは代わりに yarn パッケージ
          マネージャが使用されます。
        </p>
        <p>
          ・yarn.lock ファイルがアプリケーションのルート
          ディレクトリに存在する場合は、ランタイムでは代わりに yarn パッケージ
          マネージャが使用されます。
        </p>
        <p>
          ・package-lock.json と yarn.lock
          の両方が存在する場合は、エラーが発生してデプロイに失敗します。両方のファイルが必要な場合は、app.yaml
          ファイルの skip_files
          セクションにそれらの一方を追加して、どちらのパッケージ
          マネージャを使用するかを決定できるようにします。
        </p>
        <p>
          フレキシブル環境のランタイムは、Docker
          を使用してビルドされています。Node.js ランタイムは Ubuntu 16.04
          がベースとなっていて、Node.js ランタイムのソースコードは GitHub
          で公開されています。
        </p>
        <a
          href="https://cloud.google.com/appengine/docs/flexible/nodejs/runtime"
          target="_blank"
        >
          <cite>Google Cloud</cite>
        </a>
      </blockquote>
    </div>
    <h3>
      アプリケーションの起動
    </h3>
    <div class="quote-block">
      <blockquote class="quote">
        <i class="material-icons">
          format_quote
        </i>
        <p>
          ランタイムは npm start
          を使用してアプリケーションを起動します。ここでは、package.json
          で指定されたコマンドが使用されます。例:
        </p>
        <p>
          "scripts": {
        </p>
        <p>
          "start": "node app.js"
        </p>
        <p>
          ｝
        </p>
        <p>
          起動スクリプトはウェブサーバーを起動し、それが PORT
          環境変数で指定されたポート（一般的には 8080）で HTTP
          リクエストに応答します。
        </p>
        <a
          href="https://cloud.google.com/appengine/docs/flexible/nodejs/runtime"
          target="_blank"
        >
          <cite>Google Cloud</cite>
        </a>
      </blockquote>
    </div>

    <!-- <div class="flex-container select-mode">
      <div class="two-col">
        <section>
          <div class="mode-text">
            Nuxt.js + SSR
          </div>
          <h5>サーバーサイドレンダリング</h5>
        </section>
        <section>
          <h3>サーバーサイドレンダリング（ユニバーサル SSR）</h3>
          <p>
            Nuxt.js をプロジェクトの UI
            レンダリング全体を担うフレームワークとして使うことができます。nuxt
            コマンドを実行すると開発サーバーが起動します。このサーバーはホットリローディング及び
            Vue Server Renderer
            を備えており、アプリケーションが自動的にサーバーサイドレンダリングするよう設定されています。
          </p>
        </section>
        <section>
          <h3>静的ファイルの生成</h3>
          <p>
            アプリケーションをビルドする際、ルートやストアにあるファイル全てに対し
            HTML を生成します。
          </p>
        </section>
        <section>
          <h3>主な機能</h3>
          <ul>
            <li><p>Vue ファイルで記述できること（*.vue）</p></li>
            <li><p>コードを自動的に分割すること</p></li>
            <li><p>サーバーサイドレンダリング</p></li>
            <li><p>非同期データをハンドリングするパワフルなルーティング</p></li>
            <li><p>静的ファイルの配信</p></li>
            <li><p>ES2015+ のトランスパイレーション</p></li>
            <li><p>JS と CSS のバンドル及びミニファイ化</p></li>
            <li><p>head要素の管理</p></li>
            <li><p>開発モードにおけるホットリローディング</p></li>
            <li><p>プリプロセッサ: Sass, Less, Stylus など</p></li>
            <li><p>HTTP/2 push headers ready</p></li>
            <li><p>モジュール構造で拡張できること</p></li>
          </ul>
        </section>
      </div>
      <div class="two-col">
        <section>
          <div class="mode-text">
            GitHub + netlify
          </div>
          <h5>バージョン管理と自動ディプロイ</h5>
        </section>
        <section>
          <h3>バージョン管理</h3>
          <p>
            GitHubを利用することで、プロジェクトマネージャと開発者が一箇所で作業を調整、追跡、および更新するので、プロジェクトは透明でスケジュールどおりに維持されます。
          </p>

          <p>
            GitHubを利用することで、すべての作業を視覚化し、プロジェクトボードを使用してコードと並行して優先順位を付けます。リポジトリ内または組織全体で、どのようなタスクが計画されているか、または進行中かを確認できます。
          </p>

          <p>
            GitHubを利用することで、チームの連携を強化できます。問題を見つけやすくなります。
          </p>
        </section>
        <section>
          <h3>自動ディプロイ</h3>
          <p>
            Netlifyは新しいコミットを検出し、あなたのサイトを自動的に再構築し、そして結果を即時のグローバルアップデートとしてデプロイします。
          </p>
        </section>
      </div>
    </div> -->
  </div>
</template>

<script>
// export default {
//   props: {
//     msg: String
//   }
// }
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
  border: 1px solid rgba(0, 0, 0, 0.2);
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
.con-title {
  margin-bottom: 4rem;
}

.quote-block {
  padding: 2rem 0.5rem;
  margin-bottom: 4rem;
  @media (min-width: 992px) {
    padding: 2rem 4rem;
    margin-bottom: 4rem;
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
// .select-mode {
//   margin-top: 2rem;
// }
// .two-col {
//   width: 100%;
//   @media (min-width: 768px) {
//     width: 50%;
//     padding-right: 8rem;
//   }
//   padding-right: 2rem;
//   padding-bottom: 2rem;
//   section {
//     margin-bottom: 2rem;
//   }
//   h3 {
//     color: #000000;
//     font-weight: 600;
//     margin-bottom: 2rem;
//   }
//   p {
//     color: rgb(70, 69, 69);
//   }
// }
// .mode-text {
//   font-size: 4rem;
//   font-weight: 700;
//   color: green;
//   @media (min-width: 768px) {
//     font-size: 8rem;
//   }
// }
// a {
//   color: black;
// }
// .word-wrap {
//   word-break: break-all;
// }
// li {
//   margin-bottom: 2rem;
// }
// p {
//   word-wrap: break-word;
//   font-size: 1.6rem;
//   @media (min-width: 768px) {
//     font-size: 2rem;
//   }
// }

blockquote {
  position: relative;
  border-left: 3px solid rgb(67, 110, 211);
  padding-left: 10px;
}
i {
  color: rgb(31, 84, 209);
}
// blockquote:before {
//   position: absolute;
//   font-family: 'FontAwesome';
//   content: '\f10d';
//   font-size: 20px;
//   color: #da8596;
// }
blockquote p {
  position: relative;
  padding-left: 30px;
}
blockquote cite {
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(31, 84, 209);
  text-align: right;
}
</style>
