<template>
  <div class="headerBar">
    <div
      class="mobile-menu"
      :class="{ v_open_menu: active, v_close_menu: !active }"
    >
      <div class="m-menu-wrap">
        <div class="menu_items menu_items_column">
          <div class="menu-item-box">
            <div
              class="menu_link"
              :class="{ menu_item_visible: page === '/auth' }"
              @click="link_commit('/auth')"
            >
              Auth
            </div>
            <div class="menu_underline" />
          </div>
          <div class="menu-item-box">
            <div
              class="menu_link"
              :class="{ menu_item_visible: page === '/mypage' }"
              @click="link_commit('/mypage')"
            >
              CRUD
            </div>
            <div class="menu_underline" />
          </div>

          <div class="menu-item-box">
            <div
              class="menu_link"
              :class="{ menu_item_visible: page === '/contact' }"
              @click="link_commit('/contact')"
            >
              CONTACT
            </div>
            <div class="menu_underline" />
          </div>

          <!-- <div class="menu-item-box">
            <div
              class="menu_link"
              :class="{ menu_item_visible: page === '/login' }"
              @click="link_commit('/login')"
            >
              <div v-if="isUser">
                logoff
                <img :src="userPhotoUrl" alt="user image" class="image-mask" >
              </div>
              <div v-else>
                Login
              </div>
            </div>
            <div class="menu_underline" />
          </div> -->
        </div>
      </div>
    </div>
    <div class="nav-menu">
      <div class="block left-block">
        <div class="logo-wrap">
          <a @click="link_commit('/')">
            <img
              class="logo-img"
              src="~/assets/img/logo/h-works1200x600white.svg"
              alt="h-works logo"
            />
          </a>
        </div>
      </div>
      <div class="block center-block" />
      <div class="block right-block">
        <div class="m-menu-wrap menu-display">
          <div class="menu_items menu_items_row">
            <div class="menu-item-box">
              <a
                class="menu_link"
                :class="{ menu_item_visible: page === '/auth' }"
                @click="link_commit('/auth')"
              >
                Auth
              </a>
              <div class="menu_underline" />
            </div>
            <div class="menu-item-box">
              <a
                class="menu_link"
                :class="{ menu_item_visible: page === '/mypage' }"
                @click="link_commit('/mypage')"
              >
                CRUD
              </a>
              <div class="menu_underline" />
            </div>

            <div class="menu-item-box">
              <a
                class="menu_link"
                :class="{ menu_item_visible: page === '/contact' }"
                @click="link_commit('/contact')"
              >
                CONTACT
              </a>
              <div class="menu_underline" />
            </div>

            <div v-if="isAuthenticated" class="menu-item-box">
              <a
                class="menu_link"
                :class="{ menu_item_visible: page === '/auth' }"
                @click="link_commit('/auth')"
              >
                logoff
                <!-- <div v-if="isAuthenticated">
                  logoff
                  <img
                    :src="userPhotoUrl"
                    alt="user image"
                    class="image-mask"
                  />
                </div>
                <div v-else>
                  Login
                </div> -->
              </a>
              <div class="menu_underline" />
            </div>
            <div v-if="!isAuthenticated" class="menu-item-box">
              <a
                class="menu_link"
                :class="{ menu_item_visible: page === '/auth' }"
                @click="link_commit('/auth')"
              >
                login
                <!-- <div v-if="isAuthenticated">
                  logoff
                  <img
                    :src="userPhotoUrl"
                    alt="user image"
                    class="image-mask"
                  />
                </div>
                <div v-else>
                  Login
                </div> -->
              </a>
              <div class="menu_underline" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-button menu-button-display">
      <div class="m-bar-wrap" @click="active = !active">
        <div
          class="upper-bar"
          :class="{ close_upper: active, open_upper: !active }"
        />
        <div
          class="under-bar"
          :class="{ close_under: active, open_under: !active }"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import { mapActions, mapState, mapGetters } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  // transition: 'a-slide',
  //   props: {
  //     msg: {
  //       type: String,
  //       default: ''
  //     }
  //   },
  data() {
    return {
      active: true
    }
  },
  computed: {
    page() {
      return this.$store.state.page
    },
    //   isUser() {
    //     return this.$store.state.isLogin
    //   },
    //   userPhotoUrl() {
    //     return this.$store.state.PhotoUrl
    //   }
    // ...mapState(['user']),
    // ...mapState(['regstar']),
    // ...mapState(['authErrors']),
    // ...mapState(['userProf']),
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    link_commit(linkPath) {
      this.active = true
      this.$store.commit('pagePathSet', linkPath)
      // console.log('linkPath: ' + linkPath)
      setTimeout(() => {
        // if (linkPath === '/mypage') {
        //   location.href = linkPath // reload
        // } else {
        this.$router.push({ path: linkPath }) // non-leload
        // }
      }, 500)
    }
  }
}
</script>
<style scoped lang="scss">
%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
%left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
%right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.headerBar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  // border-bottom: 1px solid rgba(250, 250, 250, 0.1);
  // background-color: $footer-color-color;
  // background-color: #212121;
  margin: 0;
  padding: 0;
}
//nav-menu---------------------------------------
.nav-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: $header-height;
  display: flex;
  flex-direction: row;
  // border: 1px border red;
  background-color: $footer-color-color;
}

.nav-menu .left-block {
  @extend %left;
  width: 25%;
}
.nav-menu .center-block {
  @extend %center;
  width: 10%;
}
.nav-menu .right-block {
  @extend %right;
  width: 65%;
}
//logo bar----------------------------------------
.logo-wrap {
  margin: 0rem 2rem;
  @media (min-width: 992px) {
    margin: 0rem 5rem;
  }
  cursor: pointer;
}
.logo-img {
  width: 6rem;
  height: 3rem;
}
//menu_items---------------------------------------
.m-menu-wrap {
  margin: 0rem 2rem;
  @media (min-width: 992px) {
    margin: 0rem 5rem;
  }
}
.menu-display {
  display: none !important;
  @media (min-width: 992px) {
    display: block !important;
  }
}
.menu_items {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu_items_row {
  flex-direction: row;
}
.menu_items_column {
  flex-direction: column;
}
.menu-item-box {
  position: relative;
  overflow: hidden;
  margin: 0 1rem;
  padding: 0.3rem 0;
  .menu_underline {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: 2px;
    margin-top: 0.2rem;
    transform: translateX(-150%);
  }

  &:hover {
    .menu_underline {
      transition: 0.5s all ease-in;
      transform: translateX(0);
    }
  }
}
.menu_link {
  display: inline-block;
  opacity: 0.75;
  color: #fff;
  text-transform: uppercase;
  font-size: $nav_font_size;
  font-weight: $nav_font_weight;
  &:hover {
    opacity: 1;
  }
}
.menu_item_visible {
  opacity: 1;
  pointer-events: none;
}
//mobile-menu------------------------------------
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh + #{$header-height});
  background-color: $footer-color-color;
  @extend %center;
}
.v_open_menu {
  transform: translateY(-100vh);
  transition: 0.5s 0.5s all ease;
}
.v_close_menu {
  transform: translateY(0);
  transition: 0.5s 0.5s all ease;
}
//menu-button------------------------------------
.menu-button {
  position: fixed;
  top: 0;
  right: 0;
  width: $header-height;
  height: $header-height;
}
.menu-button-display {
  display: block;
  @media (min-width: 992px) {
    display: none;
  }
}
.m-bar-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}
.upper-bar,
.under-bar {
  position: absolute;
  top: calc(50% - 1px);
  right: calc(50% - 1rem);
  width: 2rem;
  height: 2px;
  background-color: #fff;
}
.close_upper {
  transform-origin: center center;
  transform: translateY(-0.25rem);
  transition: 0.5s all ease;
}
.open_upper {
  transform-origin: center center;
  transform: rotate(45deg);
  transition: 0.5s all ease;
}

.close_under {
  transform-origin: center center;
  transform: translateY(0.25rem);
  transition: 0.5s all ease;
}
.open_under {
  transform-origin: center center;
  transform: rotate(-45deg);
  transition: 0.5s all ease;
}
.image-mask {
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.25rem;
  // display: block;
  @media (min-width: 992px) {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.25rem;
    display: inline-block;
  }
}
</style>
