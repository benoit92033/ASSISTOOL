<template>
  <v-layout>
    <v-flex>
      <v-container fluid class="add-form">
        <v-form ref="form" v-model="valid" lazy-validation >
          <v-flex class="d-flex">
            <v-text-field v-model="recherche" label="Rechercher un ticket"></v-text-field>
            <v-btn color="primary" @click="search">Rechercher</v-btn>
          </v-flex>
        </v-form>
      </v-container>

      <h1>Tickets à traiter</h1>

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
          //oui
        },
      },
    }
</script>