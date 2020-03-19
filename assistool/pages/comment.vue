<template>
  <div>
    <div class="d-flex">
      <h2 class="font-weight-light">Ticket numéro : {{idTicket}}</h2>
    </div>

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


<!--
        <tr v-for="(ticket, i) in $store.state.tickets" :key="`${i}-${tickets.id_ticket}`">
         -->


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


<style>
.add-form {
  max-width: 30vw;
}

.commentaires {
  background-color:#424242;
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
  background-color: rgba(255,255,255,0.4);
  padding: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.message-commentaires{
    padding: 0px 10px 0px 0px;

}

</style>
