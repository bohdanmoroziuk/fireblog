<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'home' }">FireBlog</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'blog' }">Blog</router-link>
          <router-link
            class="link"
            :to="{ name: 'new-post' }"
            v-if="isLoggedIn"
          >
            New Post
          </router-link>
          <router-link
            class="link"
            :to="{ name: 'login' }"
            v-if="isGuest"
          >
            Login/Register
          </router-link>
        </ul>

        <div class="profile" v-if="isLoggedIn" ref="profileMenu" @click="toggleProfileMenu">
          <span>{{ initials }}</span>

          <div class="profile-menu" v-show="profileMenu">
            <div class="info">
              <p class="initials">{{ initials }}</p>

              <div class="right">
                <p>{{ fullName }}</p>
                <p>{{ currentUser.username }}</p>
                <p>{{ currentUser.email }}</p>
              </div>
            </div>

            <div class="options">
              <router-link class="option" :to="{ name: 'profile' }">
                <user-icon class="icon" />
                <p>Profile</p>
              </router-link>
              <div class="option" @click="signOut">
                <sign-out-icon class="icon" />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <menu-icon
      v-show="mobile"
      class="menu-icon"
      @click="toggleMobileNav"
    />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'blog' }">Blog</router-link>
        <router-link
          class="link"
          :to="{ name: 'new-post' }"
          v-if="isLoggedIn"
        >
          New Post
        </router-link>
        <router-link
          class="link"
          :to="{ name: 'login' }"
          v-if="isGuest"
        >
          Login/Register
        </router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import MenuIcon from '@/assets/images/icons/bars-regular.svg';
import UserIcon from '@/assets/images/icons/user-alt-light.svg';
import SignOutIcon from '@/assets/images/icons/sign-out-alt-regular.svg';

const store = {
  computed: {
    ...mapState('auth', [
      'currentUser',
    ]),
    ...mapGetters('auth', [
      'initials',
      'fullName',
      'isLoggedIn',
      'isGuest',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'signOut',
    ]),
  },
};

export default {
  name: 'Navbar',
  mixins: [store],
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      profileMenu: null,
    };
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      this.mobile = window.innerWidth <= 750;

      if (!this.mobile) {
        this.mobileNav = false;
      }
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(event) {
      if (event.target === this.$refs.profileMenu) {
        this.profileMenu = !this.profileMenu;
      }
    },
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreen);
  },
  components: {
    MenuIcon,
    UserIcon,
    SignOutIcon,
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          /* width: 320px; */
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              min-width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;

            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }

    .mobile-user-menu {
      margin-right: 40px;
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}

.mobile-nav-enter {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
