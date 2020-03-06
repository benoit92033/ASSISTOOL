<style>
  .tickets td {
    padding: 10px;
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
      <table class="tickets">
        <tbody>
          <tr v-for="ticket in tickets" v-bind:key="ticket">
            <td>{{ ticket.title }}</td>
            <td>{{ ticket.priority }}</td>
            <td><v-btn color="primary" @click="commenter(ticket.id)">Commenter</v-btn></td>
            <td><v-btn color="primary" @click="traiter(ticket.id)">Traiter</v-btn></td>
            <td><v-btn color="error" @click="fermer(ticket.id)">Fermer</v-btn></td>
            <td><v-btn color="warning" @click="transferer(ticket.id)">Transferer</v-btn></td>

          </tr>
        </tbody>
      </table>

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