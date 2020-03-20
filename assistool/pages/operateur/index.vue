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
        <v-form ref="form" lazy-validation>
          <v-flex class="d-flex">
            <v-text-field v-model="searchtxt" label="Rechercher un ticket"></v-text-field>
            <!-- <v-btn color="primary" @click="search">Rechercher</v-btn> -->
          </v-flex>
        </v-form>
      </v-container>

      <h1 class="display-2 font-weight-light">Tickets à traiter</h1>

      <div v-for="(ticket, i) in FilteredTickets" :key="`${i}-${tickets.id_ticket}`" class="tickets" >
        <div class="d-flex">
          <h2 class="font-weight-light">{{ ticket.titre }}</h2>
          <v-btn
            v-if="ticket.urgence == 1 "
            depressed
            small
            style="margin: 10px; pointer-events: none;"
            color="success"
          >Pas urgent</v-btn>
          <v-btn
            v-else-if="ticket.urgence == 2 || ticket.urgence == 3"
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
          @click="commenter(ticket.id_ticket)"
        >Commenter</v-btn>
        <v-btn
          style="margin: 10px;"
          rounded
          large
          color="primary"
          @click="traiter(ticket.id_ticket)"
        >Traiter</v-btn>
        <v-btn style="margin: 10px;" rounded large color="error" @click="fermer(ticket.id_ticket)">Fermer</v-btn>
        <v-btn
          style="margin: 10px;"
          rounded
          large
          color="warning"
          @click="transferer(ticket.id_ticket)"
        >Transferer</v-btn>
      </div>


       <h1 class="display-2 font-weight-light">Tickets Fermés</h1>

      <div v-for="tc in ticketsClose" :key="tc.id_ticket" class="tickets" >
        <div class="d-flex">
          <h2 class="font-weight-light">{{ tc.titre }}</h2>
          <v-btn v-if="tc.urgence == 1" depressed small style="margin: 10px; pointer-events: none;" color="success" >Pas urgent</v-btn>
          <v-btn v-else-if="tc.urgence == 2 || tc.urgence == 3" depressed small style="margin: 10px; pointer-events: none;" color="warning" >Urgent</v-btn>
          <v-btn v-else depressed small style="margin: 10px; pointer-events: none;" color="error" >Très Urgent</v-btn>
        </div>
        <div>
          <p>{{ tc.description }}</p>
        </div>
        <div>
          <img src="v.png" />
        </div>
      </div>

    </v-flex>



  </v-layout>



</template>


<script>
export default {
  middleware: 'auth',
  data: () => ({
    tickets: [],
    ticketsClose: [],
    searchtxt: ''
  }),

  methods: {
     async getTickets() {
      try {
         await this.$store.dispatch('getTickets').then(response => {
           this.tickets = this.$store.state.tickets
        })
      } catch (e) {
        this.formError = e.message
      }

    },

    async getTicketsClose() {
      try {
         await this.$store.dispatch('getTicketsClose').then(response => {
           this.ticketsClose = this.$store.state.ticketsClose
        })
      } catch (e) {
        this.formError = e.message
      }

    },

    commenter(idTicket) {
      this.$store.commit("setTicketId",idTicket)
      this.$router.push("comment")


    },
    traiter(idTicket) {
      console.log('traiter')
      console.log(idTicket)
    },
    fermer(idTicket) {
      this.$store.dispatch('closeTicket', idTicket)
      this.getTickets(),
      this.getTicketsClose()
    },
    transferer(idTicket) {
      this.$store.dispatch('transfertoResp', idTicket)
      this.getTickets(),
      this.getTicketsClose()

    }
  },
  created() {
    this.getTickets(),
    this.getTicketsClose()

  },
  computed: {
    FilteredTickets: function() {
      return this.tickets.filter(ticket => {
        return ticket.titre.toLowerCase().match(this.searchtxt.toLowerCase())
      })
    },

    FilteredTicketsClose: function() {
      return this.ticketsClose.filter(ticket => {
        return ticket.titre.toLowerCase().match(this.searchtxt.toLowerCase())
      })
    }
  }
}
</script>
