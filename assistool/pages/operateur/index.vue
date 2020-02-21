<template>
  <v-layout>
    <v-flex>
      <v-container fluid class="add-form">
        <v-form ref="form" v-model="valid" lazy-validation >
            <v-text-field v-model="recherche" label="Rechercher un ticket"></v-text-field>
            <v-btn color="primary" @click="validate">Rechercher</v-btn>
        </v-form>
      </v-container>

      <h1>Tickets à traiter</h1>
    </v-flex>
  </v-layout>
</template>
<script>

</script>