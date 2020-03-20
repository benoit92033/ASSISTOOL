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
          @click="showPopup(ticket.id_ticket , ticket.type)"
        >Transferer</v-btn>
      </div>


       <h1 class="display-2 font-weight-light">Tickets Fermés</h1>

      <div v-for="tc in ticketsClose" :key="tc.id_ticket" class="tickets" >
        <div class="d-flex">
          <h2 class="font-weight-light">{{ tc.titre }}</h2>
          <v-btn
            v-if="tc.urgence == 1"
            depressed
            small
            style="margin: 10px; pointer-events: none;"
            color="success"
          >Pas urgent</v-btn>
          <v-btn
            v-else-if="tc.urgence == 2 || tc.urgence == 3"
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
          <p>{{ tc.description }}</p>
        </div>
        <div>
          <img src="v.png" />
        </div>
      </div>

    </v-flex>
<v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-model="dialogm1" column  >
            <div v-for="operator in operators" :key="operator.id_user" >
              <v-radio :value="operator.id_user" v-bind:label="operator.nom + ' ' + operator.prenom + ' '" > </v-radio>
            </div>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="transferer()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>


  </v-layout>



</template>


<script>
export default {
  middleware: 'auth',
  data: () => ({
    tickets: [],
    ticketsClose: [],
    searchtxt: '',
    dialogm1: '',
    dialog: false,
    idTicket: 0,
    operators: [],
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

    async getOperators(type) {
      try {
         await this.$store.dispatch('getOperators',type).then(response => {
           this.operators = this.$store.state.operators;
           console.log(this.operators)
        })
      } catch (e) {
        this.formError = e.message
      }

    },

    showPopup(idTick, type)
    {
      this.idTicket = idTick;
      this.dialog = true ;
      this.getOperators(type) ;


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
    transferer() {
      if(this.dialogm1 != '')
      {
        this.$store.dispatch('transferToOp', {

              id_ticket: this.idTicket,
              id_user: this.dialogm1

            })
      }
      this.dialog = false ;
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
