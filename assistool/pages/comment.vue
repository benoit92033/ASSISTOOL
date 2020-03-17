<style>
.add-form {
  max-width: 30vw;
}

.description {
  background-color: #323232;
  padding: 20px;
  margin-bottom: 20px;
}
</style>

<template>
  <div>
    <div class="d-flex">
      <h2 class="font-weight-light">titre</h2>
    </div>
    <div>
      <p>desc</p>
    </div>
  </div>
</template>


<script>
export default {
  middleware: 'auth',
  data: () => ({
    comments: []
  }),

  methods: {
    async getComments() {
      try {
        await this.$store.dispatch('getComments').then(response => {
          this.comments = this.$store.state.comments
          console.log(this.comments)
        })
      } catch (e) {
        this.formError = e.message
      }
    },
    commenter(idTicket) {
      console.log('commenter')
      console.log(idTicket)
    }
  },

    created() {
      this.getComments()
    }
}
</script>


