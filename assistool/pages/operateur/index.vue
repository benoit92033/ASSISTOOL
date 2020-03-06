<style>
  .tickets {
    background-color: grey;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
  }
  .tickets p {
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
  }
</style>

<template>
  <v-layout>
    <v-flex>
      <v-container fluid>
        <v-form ref="form" v-model="valid" lazy-validation >
          <v-flex class="d-flex">
            <v-text-field v-model="recherche" label="Rechercher un ticket"></v-text-field>
            <v-btn color="primary" @click="search">Rechercher</v-btn>
          </v-flex>
        </v-form>
      </v-container>

      <h1 class="display-1 font-weight-light">Tickets à traiter</h1>

      <div v-for="ticket in tickets" v-bind:key="ticket" class="tickets">
        <div class="d-flex">
          <p>{{ ticket.title }}</p>
          <p v-if="ticket.priority == 0" style="background-color: green;">Oui</p>
          <p v-else-if="ticket.priority == 1" style="background-color: yellow;">Urgent</p>
          <p v-else style="background-color: red;">Très Urgent</p>
        </div>
        <v-btn style="margin: 10px;" large color="primary" @click="commenter(ticket.id)">Commenter</v-btn>
        <v-btn style="margin: 10px;" large color="primary" @click="traiter(ticket.id)">Traiter</v-btn>
        <v-btn style="margin: 10px;" large color="error" @click="fermer(ticket.id)">Fermer</v-btn>
        <v-btn style="margin: 10px;" large color="warning" @click="transferer(ticket.id)">Transferer</v-btn>
      </div>

    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
        tickets: [
          {id:"0", title:"Ecran cassé", priority: "0"},
          {id:"1", title:"Bug souris", priority: "1"},
          {id:"2", title:"Bavey a cassé le pc", priority: "2"}
        ],
      }),
  
      methods: {
        search () {
          console.log(this.recherche)
        },
        commenter (idTicket) {
          console.log("commenter")
          console.log(idTicket)
        },
        traiter (idTicket) {
          console.log("traiter")
          console.log(idTicket)
        },
        fermer (idTicket) {
          console.log("fermer")
          console.log(idTicket)
        },
        transferer (idTicket) {
          console.log("transferer")
          console.log(idTicket)
        },
      },
    }
</script>