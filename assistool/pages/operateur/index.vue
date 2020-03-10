<style>
  .tickets {
    background-color: rgb(40,40,40);
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
        <v-form ref="form" v-model="valid" lazy-validation >
          <v-flex class="d-flex">
            <v-text-field v-model="recherche" label="Rechercher un ticket"></v-text-field>
            <v-btn color="primary" @click="search">Rechercher</v-btn>
          </v-flex>
        </v-form>
      </v-container>

      <h1 class="display-2 font-weight-light">Tickets à traiter</h1>

      <div v-for="ticket in tickets" v-bind:key="ticket" class="tickets">
        <div class="d-flex">
          <h2 class="font-weight-light">{{ ticket.title }}</h2>
          <v-btn v-if="ticket.priority == 0" depressed small style="margin: 10px; pointer-events: none;" color="success">Pas urgent</v-btn>
          <v-btn v-else-if="ticket.priority == 1" depressed small style="margin: 10px; pointer-events: none;" color="warning">Urgent</v-btn>
          <v-btn v-else depressed small style="margin: 10px; pointer-events: none;" color="error">Très Urgent</v-btn>
        </div>
        <div>
          <p>Description du ticjket du coup j'ecris des choses mais qui ne veulent rien dire : patate, fillon, phillipe risoli, marinade, histoire.</p>
        </div>
        <div>
          <img src="v.png">
        </div>
        <v-btn style="margin: 10px;" rounded large color="primary" @click="commenter(ticket.id)">Commenter</v-btn>
        <v-btn style="margin: 10px;" rounded large color="primary" @click="traiter(ticket.id)">Traiter</v-btn>
        <v-btn style="margin: 10px;" rounded large color="error" @click="fermer(ticket.id)">Fermer</v-btn>
        <v-btn style="margin: 10px;" rounded large color="warning" @click="transferer(ticket.id)">Transferer</v-btn>
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