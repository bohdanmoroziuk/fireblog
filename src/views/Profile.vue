<template>
  <div class="profile">
    <modal
      v-if="isModalOpen"
      :message="message"
      @close="closeModal"
    />

    <div class="container">
      <h2>Account Settings</h2>

      <form class="profile-info" @submit.prevent="submit">
        <div class="initials">{{ initials }}</div>

        <div class="admin-badge">
          <admin-icon class="icon" />
          <span>admin</span>
        </div>

        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model.trim="model.firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model.trim="model.lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model.trim="model.username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input type="email" id="email" :value="model.email" disabled />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Modal from '@/components/Modal.vue';
import AdminIcon from '@/assets/images/icons/user-crown-light.svg';

const store = {
  computed: {
    ...mapState('auth', [
      'currentUser',
    ]),
    ...mapGetters('auth', [
      'initials',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'updateProfile',
    ]),
  },
};

export default {
  name: 'Profile',
  mixins: [store],
  data() {
    return {
      isModalOpen: false,
      message: '',
      model: {},
    };
  },
  watch: {
    currentUser: {
      deep: true,
      immediate: true,
      handler: 'setModel',
    },
  },
  methods: {
    setModel(value) {
      this.model = { ...value };
    },
    openModal() {
      this.isModelOpen = true;
    },
    closeModal() {
      this.isModelOpen = false;
    },
    async submit() {
      try {
        await this.updateProfile(this.model);

        this.message = 'Changes were saved';
      } catch (error) {
        this.message = error.message;
      } finally {
        this.openModal();
      }
    },
  },
  components: {
    Modal,
    AdminIcon,
  },
};
</script>

<style lang="scss" scoped>
.profile {

  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;

          @media (min-width: 900px) {

          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
