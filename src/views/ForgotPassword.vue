<template>
  <div class="reset-password">
    <modal
      v-if="isModalOpen"
      :message="message"
      @close="closeModal"
    />

    <loader v-if="isLoading" />

    <div class="form-wrap">
      <form class="reset" @submit.prevent="submit">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'login' }">Log In</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>

        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <img src="@/assets/images/icons/envelope-regular.svg" alt="" class="icon">
          </div>
        </div>

        <button type="submit">Reset</button>

        <div class="angle"></div>
      </form>

      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Modal from '@/components/Modal.vue';
import Loader from '@/components/Loader.vue';

const store = {
  methods: {
    ...mapActions('auth', [
      'resetPassword',
    ]),
  },
};

export default {
  name: 'ForgotPassword',
  mixins: [store],
  data() {
    return {
      email: '',
      message: '',
      isModalOpen: false,
      isLoading: false,
    };
  },
  methods: {
    async submit() {
      try {
        this.isLoading = true;

        await this.resetPassword({ email: this.email });

        this.message = 'If your account exists, you will receive an email';
        this.isModalOpen = true;
      } catch (error) {
        this.message = error.message;
        this.isModalOpen = true;
      } finally {
        this.isLoading = false;
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.email = '';
    },
  },
  components: {
    Modal,
    Loader,
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;

  .form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;

    @media (min-width: 900px) {
      width: 100%;
    }

    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }

    .login-register {
      margin-bottom: 32px;
      .router-link {
        color: #000;
      }
    }

    form {
      padding: 0 10px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;

      @media (min-width: 900px) {
        padding: 0 50px;
      }

      h2 {
        text-align: center;
        font-size: 32px;
        color: #303030;
        margin-bottom: 40px;
        max-width: 350px;

        @media (min-width: 900px) {
          font-size: 40px;
        }
      }

      .inputs {
        width: 100%;
        max-width: 350px;

        .input {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 8px;

          input {
            width: 100%;
            border: none;
            background-color: #f2f7f6;
            padding: 4px 4px 4px 30px;
            height: 50px;

            &:focus {
              outline: none;
            }
          }

          .icon {
            width: 12px;
            position: absolute;
            left: 6px;
          }
        }
      }

      .forgot-password {
        text-decoration: none;
        color: #000;
        cursor: pointer;
        font-size: 14px;
        margin: 16px 0 32px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease all;

        &:hover {
          border-color: #303030;
        }
      }

      .angle {
        display: none;
        position: absolute;
        background-color: #fff;
        transform: rotateZ(3deg);
        width: 60px;
        right: -30px;
        height: 101%;

        @media (min-width: 900px) {
          display: initial;
        }
      }
    }

    .background {
      display: none;
      flex: 2;
      background-size: cover;
      background-image: url("../assets/images/background.png");
      width: 100%;
      height: 100%;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }
}
</style>
