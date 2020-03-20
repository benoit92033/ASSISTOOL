<template>
  <div>

    <div class="d-flex">
      <h2 class="font-weight-light">Ticket numéro : {{idTicket}}</h2>
    </div>

      <div class="container-height">
        <div
          v-for="(comment, i) in comments"
          :key="`${i}-${comments.id_commentaire}`"
          class="Commentaires-container"
          >
          <div
              v-if="idUser != comment.id_user"
              class="commentaires">
              <div >
                <p class="nom-commentaires">{{ comment.nom }} {{ comment.prenom }}</p>
              </div>
              <div>
                <p class="message-commentaires">{{ comment.commentaire }}</p>
            </div>
          </div>
        <div
            v-if="idUser == comment.id_user"
            class="commentairesUS">
            <div>
              <p class="nom-commentaires">{{ comment.nom }} {{ comment.prenom }}</p>
            </div>
            <div>
              <p class="message-commentaires">{{ comment.commentaire }}</p>
          </div>
        </div>
      </div>
      </div>

      <v-container fluid class="input-commentaire">
        <v-form ref="form" lazy-validation>
          <v-flex class="d-flex">
            <v-text-field class="text-comment" v-model="commenttxt" label="Ecrire un commentaire :"></v-text-field>
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
    idTicket: 0,
    idUser: 0
  }),

  methods: {
    async getComments() {
      try {
        await this.$store.dispatch('getComments').then(response => {
          this.comments = this.$store.state.comments
          this.idTicket = this.$store.state.id_Ticket
          this.idUser = this.$store.state.authUser[0].user[0].id_user
          this.$refs.form.reset()
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


<style>

.commentaires {
  background-color:#353535;
  margin-right:100px;
  padding: 0px 0px 10px 0px;
  border-radius: 10px;
}

.commentairesUS {
  background-color: #0D47A1;
  margin-left: 100px;
  padding: 0px 0px 10px 0px;
  border-radius: 10px;
}

.Commentaires-container{
  margin: 20px 10px 20px 10px;
}

.nom-commentaires{
  background-color: rgba(255,255,255,0.3);
  padding:4px 4px 4px 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.message-commentaires{
    padding: 0px 10px 0px 10px;
}

.input-commentaire{
  z-index: 1;
  position:fixed;
  top: 80%;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #121212;
}

.text-comment{
  max-width: 70%;
}

.container-height{
 margin-bottom: 15%;
}

</style>
