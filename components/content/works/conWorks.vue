<template>
  <div class="worksIntro">
    <div class="flex-container">
      <div class="side-col">
        <p
          class="topMenu topMenu1"
          :class="{ activeTopMenu: selectMenu === 1 }"
          @click="menuActive(1)"
        >
          1.プロジェクトを作る
        </p>
        <div v-if="selectMenu === 1" class="subMenu">
          <p>GitHub リモートリポジトリをcloneする。</p>
          <p>GitHub 新規リポジトリを作成する。</p>
        </div>
      </div>

      <div class="main-col">
        <div class="topMain h1-res">
          １．プロジェクトを作る
        </div>
        <div class="mainTitle">
          <div class="h3-res">
            GitHubリポジトリをcloneしてローカルプロジェクトを作る
          </div>
        </div>
        <div class="mainDescription">
          <p>
            プロジェクトホルダーを作成し、GitHubからローカルにデモアプリケーションをコピーします。
          </p>
        </div>

        <div class="mainOperation">
          1. リモートリポジトリをcloneする。
        </div>
        <!-- <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd1)" />
          </div>
        </div> -->
        <div class="mainOperation">
          2. インストールする
        </div>
        <!-- <div class="mainComandWrap">
          <div class="mainComand">
            <div v-html="$md.render(cmd2)" />
          </div>
        </div> -->
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
      $ git clone https://github.com/hiramatsuYoshiaki/nuxt-univ-app1.git
       `,
      cmd2: `
    $ npm install
                      `,
      cmd3: `
    export default {
        css: [
            // プロジェクト内の SCSS ファイル
            '@/assets/sass/styles.scss'
        ]
    }
                      `
    }
  },
  //   computed: {
  //     page() {
  //       return this.$store.state.page
  //     }
  //   },
  methods: {
    menuActive(index) {
      this.selectMenu = index
      // if (this.selectMenu === index) {
      //   this.selectMenu = null
      // } else {
      //   this.selectMenu = index
      // }
    }
    //     link_commit(linkPath) {
    //       this.active = true
    //       this.$store.commit('pagePathSet', linkPath)
    //       setTimeout(() => {
    //         this.$router.push({ path: linkPath })
    //       }, 500)
    //     }
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
    padding-right: 10rem;
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
  color: rgb(53, 53, 53);
  font-weight: 700;
  font-size: 2rem;
  @media (min-width: 992px) {
    font-size: 4rem;
  }
}
p {
  color: rgb(70, 69, 69);
}
</style>
