<script>
import { mapActions } from 'vuex'

export default {
  props: ['product', 'isLoggedin', 'user'],
  methods: {
    ...mapActions({
      makeComment: 'products/makeComment',
      deleteComment: 'products/deleteComment'
    }),
    async sendComment() {
      if (!this.comment) return
      if(!this.isLoggedin) return this.showAlert = true
      this.isSaving = true
      const userComment = {
        productId: this.product._id,
        comment: {
          user: this.user.username,
          message: this.comment,
        },
      }
      await this.makeComment(userComment)
      this.$emit('update-comment')
      this.comment = ''
      this.isSaving = false
    },
    async delComment(commentId) {
      const comment = {
        productId: this.product._id,
        commentId: commentId
      }
      await this.deleteComment(comment)
      this.$emit('update-comment')
    }
  },
  data() {
    return {
      comment: '',
      isSaving: false,
      showAlert: false
    }
  }
}
</script>

<template>
  <b-col cols="12" class="mt-4">
      <!-- Comment section starts -->
    <b-col cols="12" class="comments" v-if="product.comments.length">
    <h4 class="text-center">Comments</h4>
      <ul
        v-for="comment in product.comments"
        :key="comment.id"
        class="comment-list border p-2"
      >
        <b-icon v-if="user.username == comment.user" icon='x' class="del-comment" @click="delComment(comment.id)"></b-icon>
        <li class="comment-user-name font-weight-bold">
          <nuxt-link :to='`/user/${comment.user}`'>{{ comment.user }}</nuxt-link>
        </li>
        <li class="speech-bubble">{{ comment.message }}</li>
      </ul>
    </b-col>
    <b-col cols="12" class="make-comment mt-5">
      <p class="m-0">Leave a comment...</p>

      <b-alert v-model="showAlert" variant="danger" dismissible fade
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000;"
      >
        You need to login first!
      </b-alert>

      <b-form-textarea v-model="comment"></b-form-textarea>
      <b-button
        class="mt-2 mb-2 float-right"
        @click="sendComment"
        variant="primary"
        size="sm"
        :disabled="isSaving"
      >
        <b-spinner small v-show="isSaving"></b-spinner>
        <span v-show="!isSaving">Send</span>
      </b-button>
    </b-col>
    <!-- Comment section ends -->
  </b-col>
</template>

<style scoped>
.comment-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
}
.comment-list li {
 margin-inline: 1rem;
}
.speech-bubble {
	position: relative;
	background: #E1E8EB;
	border-radius: .4em;
  padding: .5rem;
}
.speech-bubble:after {
	content: '';
	position: absolute;
	left: -1rem;
	top: .5rem;
	width: 0;
	height: 0;
	border: 1rem solid transparent;
	border-right-color: #E1E8EB;
	border-left: 0;
	border-top: 0;
}
.del-comment {
  cursor: pointer;
  color:red;
  position:absolute;
  right:1rem;
}
</style>