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
          @click="transferer(ticket)"
        >Transferer</v-btn>
        <v-btn
          style="margin: 10px;"
          rounded
          large
          color="light-green darken-2"
          @click="showPopupDate()"
        >Estimation date de fin</v-btn>
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


 <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Estimation de la date de fin :</v-card-title>

        <v-menu max-width="290">
          <template v-slot:activator="{ on }">
            <v-text-field :value="due" label="Date de prévision" prepend-icon="mdi-calendar-range" v-on="on"></v-text-field>
          </template>
          <v-row justify="center">
            <v-date-picker
              v-model="due"
              year-icon="mdi-calendar-blank"
              prev-icon="mdi-skip-previous"
              next-icon="mdi-skip-next"
              color="green darken-1"
              header-color="green darken-1">
            </v-date-picker>
          </v-row>
</v-menu>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-2" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="green darken-2" text @click="envoyerDate()">Sauvegarder</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>






  </v-layout>



</template>


<script>

export default {
  middleware: ['auth','operator'],
  data: () => ({
    tickets: [],
    ticketsClose: [],
    searchtxt: '',
    dialog: false,
    due: null
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

    showPopupDate()
    {
      this.dialog = true ;
    },
    envoyerDate()
    {
      console.log(this.due)
      this.dialog = false ;
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
    transferer(ticket) {
      this.$store.dispatch('transferto', ticket)
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
