<style>
.tickets {
  background-color: rgb(40, 40, 40);
  margin: 20px 10px 20px 10px;
  padding: 10px;
  border-radius: 10px;
}

.tickets h2 {
  margin: 5px 5px 20px 5px;
}
</style>

<template>
  <v-layout>
    <v-flex>
      <v-container fluid>
        <v-form ref="form"  lazy-validation>
          <v-flex class="d-flex">
            <v-text-field label="Rechercher un ticket"></v-text-field>
            <v-btn color="primary" @click="search">Rechercher</v-btn>
          </v-flex>
        </v-form>
      </v-container>

      <h1 class="display-2 font-weight-light">Tickets à traiter</h1>

      <div
        v-for="(ticket, i) in $store.state.tickets"
        :key="`${i}-${tickets.id_ticket}`"
        class="tickets"
      >
        <div class="d-flex">
          <h2 class="font-weight-light">{{ ticket.titre }}</h2>
          <v-btn
            v-if="ticket.urgence == 0"
            depressed
            small
            style="margin: 10px; pointer-events: none;"
            color="success"
          >Pas urgent</v-btn>
          <v-btn
            v-else-if="ticket.urgence == 1"
            depressed
            small
            style="margin: 10px; pointer-events: none;"
            color="warning"
          >Urgent</v-btn>
          <v-btn
            v-else
            depressed
            small
            style="margin: 10px; pointer-events: none;"
            color="error"
          >Très Urgent</v-btn>
        </div>
        <div>
          <p>{{ ticket.description }}</p>
        </div>
        <div>
          <img src="v.png" />
        </div>
        <v-btn
          style="margin: 10px;"
          rounded
          large
          color="primary"
          @click="commenter(ticket.id)"
        >Commenter</v-btn>
        <v-btn
          style="margin: 10px;"
          rounded
          large
          color="primary"
          @click="traiter(ticket.id)"
        >Traiter</v-btn>
        <v-btn style="margin: 10px;" rounded large color="error" @click="fermer(ticket.id)">Fermer</v-btn>
        <v-btn
          style="margin: 10px;"
          rounded
          large
          color="warning"
          @click="transferer(ticket.id)"
        >Transferer</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  middleware: 'auth',
  data: () => ({
    tickets: [
    ]
  }),

  methods: {
    async getTickets() {
      try {
        await this.$store.dispatch('getTickets', {}).then(response => {
          // seulement si les logins sont bons
        })
      } catch (e) {
        this.formError = e.message
      }
    },
    search() {
      console.log(this.recherche)
    },
    commenter(idTicket) {
      console.log('commenter')
      console.log(idTicket)
    },
    traiter(idTicket) {
      console.log('traiter')
      console.log(idTicket)
    },
    fermer(idTicket) {
      console.log('fermer')
      console.log(idTicket)
    },
    transferer(idTicket) {
      console.log('transferer')
      console.log(idTicket)
    }

  },
  created() {
      this.getTickets();
    }

}
</script>
