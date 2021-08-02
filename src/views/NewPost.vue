<template>
  <div class="new-post">
    <cover-photo-preview
      v-if="isModalOpen"
      :cover-photo-url="coverPhotoUrl"
      @close="closeModal"
    />

    <loader v-if="isLoading" />

    <div class="container">
      <div class="error-message" :class="{ invisible: !hasError }">
        <p>
          <span>Error:</span> {{ errorMessage }}
        </p>
      </div>

      <div class="blog-info">
        <input
          type="text"
          placeholder="Enter post title"
          v-model.trim="title"
        />

        <div class="upload-file">
          <label for="cover-photo">Upload Cover Photo</label>
          <input
            type="file"
            name="cover-photo"
            id="cover-photo"
            ref="coverPhotoInput"
            accept=".png, .jpg, .jpeg"
            @change="handleCoverPhotoChange"
          />
          <button
            class="preview"
            :class="{ 'button-inactive': !coverPhotoUrl }"
            @click="openModal"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ coverPhotoName }}</span>
        </div>
      </div>

      <div class="editor">
        <editor
          :editorOptions="editorSettings"
          v-model="content"
          use-custom-image-handler
          @image-added="handleImageAdd"
        />
      </div>

      <div class="blog-actions">
        <button @click="publishPost">Publish Post</button>
        <button @click="viewPost">Post Preview</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/first */
/* eslint-disable import/order */
/* eslint-disable no-shadow */

import { mapGetters, mapMutations, mapActions } from 'vuex';

import { VueEditor as Editor, Quill } from 'vue2-editor';

window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;

Quill.register('modules/imageResize', ImageResize);

import CoverPhotoPreview from '@/components/CoverPhotoPreview.vue';
import Loader from '@/components/Loader.vue';

import { storage, database } from '@/firebase';

const store = {
  computed: {
    ...mapGetters('auth', ['userId']),
  },
  methods: {
    ...mapMutations('blog', ['addPost']),
    ...mapActions('blog', ['uploadImage', 'getPosts']),
  },
};

export default {
  name: 'NewPost',
  mixins: [store],
  data() {
    return {
      title: '',
      content: '',
      coverPhoto: null,
      coverPhotoFileUrl: '',
      hasError: null,
      errorMessage: '',
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      isModalOpen: false,
      isLoading: false,
    };
  },
  computed: {
    coverPhotoName() {
      return this.coverPhoto?.name;
    },
    coverPhotoUrl() {
      return this.coverPhoto ? URL.createObjectURL(this.coverPhoto) : null;
    },
    post() {
      return {
        title: this.title,
        coverPhoto: this.coverPhoto,
        content: this.content,
      };
    },
    isPostValid() {
      return this.title.length > 0 && this.content.length > 0;
    },
  },
  methods: {
    handleCoverPhotoChange() {
      const [file] = this.$refs.coverPhotoInput.files;
      this.coverPhoto = file;
    },
    handleImageAdd(file, Editor, cursorLocation, resetUploader) {
      this.uploadImage({
        image: file,
        onComplete: (imageUrl) => {
          Editor.insertEmbed(cursorLocation, 'image', imageUrl);
          resetUploader();
        },
      });
    },
    displayError(message) {
      this.hasError = true;
      this.errorMessage = message;

      setTimeout(() => {
        this.hasError = false;
        this.errorMessage = '';
      }, 2500);
    },
    viewPost() {
      this.addPost(this.post);
      this.$router.push({ name: 'post-preview' }).catch(() => {});
    },
    publishPost() {
      if (this.isPostValid) {
        if (this.coverPhoto) {
          const storageRef = storage.ref();
          const documentRef = storageRef.child(`documents/postCoverPhotos/${this.coverPhoto.name}`);

          documentRef.put(this.coverPhoto).on('state_changed',
            () => {},
            () => {},
            async () => {
              const downloadUrl = await documentRef.getDownloadURL();
              const document = database.posts.doc();

              this.isLoading = true;

              await document.set({
                id: document.id,
                title: this.title,
                content: this.content,
                coverPhoto: downloadUrl,
                coverPhotoName: this.coverPhotoName,
                userId: this.userId,
                date: Date.now(),
              });

              await this.getPosts();

              this.isLoading = false;
              this.$router.push({ name: 'blog' }).catch(() => {});
            });
        } else {
          this.displayError('Please ensure you uploaded a cover photo');
        }
      } else {
        this.displayError('Please ensure title and content has been filled!');
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  components: {
    Editor,
    Loader,
    CoverPhotoPreview,
  },
};
</script>

<style lang="scss" scoped>
.new-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  .invisible {
    opacity: 0 !important;
  }

  .error-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>

<style lang="scss">
.editor {
  height: 60vh;
  display: flex;
  flex-direction: column;

  .quillWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ql-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
  }

  .ql-editor {
    padding: 20px 16px 30px;
  }
}
</style>
