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

    <v-container fluid>
      <v-form ref="form" lazy-validation>
        <v-flex class="d-flex">
          <v-text-field v-model="commenttxt" label="Ecrire un commentaire :"></v-text-field>
          <v-btn color="primary" @click="commenter">Envoyer</v-btn>
        </v-flex>
      </v-form>
    </v-container>
  </div>
</template>


<script>
export default {
  middleware: 'auth',
  data: () => ({
    comments: [],
    commenttxt: '',
    idTicket: 0
  }),

  methods: {
    async getComments() {
      try {
        await this.$store.dispatch('getComments').then(response => {
          this.comments = this.$store.state.comments
          this.idTicket = this.$store.state.id_Ticket
          console.log(this.comments)

        })
      } catch (e) {
        this.formError = e.message
      }
    },
    commenter(idTicket) {
      try {
        this.$store.dispatch('setComment', this.commenttxt)
        this.getComments()
      } catch (e) {
        this.formError = e.message
      }

    }
  },
  created() {
    this.getComments()
  }
}
</script>


