<style>
.add-form{
  max-width: 30vw;
}

.description{
  background-color: #323232;
  padding: 20px;
  margin-bottom: 20px;
}

</style>

<template>
<v-layout>
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Titre</th><th>Urgence</th>
        </tr>
      </thead>
      <tbody>

      <tr v-for="(ticket, i) in tickets" :key="`${i}-${tickets.id}`">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.priority }}</td>
      </tr>

      </tbody>
    </table>

    <v-flex class="text-center">

        <p class="display-3 font-weight-light">Nouveau ticket</p>
      
        <v-container fluid class="add-form">

            <v-form ref="form" v-model="valid" lazy-validation >

                <v-text-field v-model="title" :rules="[v => !!v || 'Titre requis']" label="Titre" required></v-text-field>

                <v-flex class="d-flex">

                  <v-text-field v-model="poste" :rules="[v => !!v || 'Numéro du poste requis']" label="Poste" required></v-text-field>

                  <v-col class="mx-auto">

                    <v-select 
                      v-model="urgence" 
                      :items="urgences" 
                      :rules="[v => !!v || 'Urgence requise']" 
                      label="Urgence"
                      dense 
                      required>
                    </v-select>

                  </v-col>

                </v-flex>

                <v-col class="mx-auto">
                  <v-select 
                    v-model="probleme" 
                    :items="problemes" 
                    :rules="[v => !!v || 'Problème requis']" 
                    label="Problème" 
                    dense 
                    required></v-select>
                </v-col>

                <v-textarea v-model="description" class="description" label="Description" :rules="[v => !!v || 'Description requise']" auto-grow></v-textarea>

                <v-flex class="d-flex justify-space-around mb-6">
                  <v-btn :disabled="!valid" color="success" @click="validate">Envoyer</v-btn>
                  <v-btn color="error" @click="reset">Annuler</v-btn>
                </v-flex>

            </v-form>

        </v-container>

    </v-flex>

  </v-layout>
</template>
<script>
  export default {
    data: () => ({
        valid:true,

        newTicket:[],

        title:'',

        poste:'',
        
        description:'',

        urgence:1,

        probleme:null,

        tickets: [
          {id:"0", title:"Ecran cassé", priority: "0"},
          {id:"1", title:"Bug souris", priority: "1"},
          {id:"2", title:"Bug microsoft word", priority: "2"}
        ],
        urgences: [1,2,3,4,5],
        problemes: ['Logiciel','Materiel','Utilisateur']
      }),
  
      methods: {
        validate () {
          if (this.$refs.form.validate()) {
            this.snackbar = true

            this.newTicket = {
              id:0,
              title:this.title,
              poste:this.poste,
              priority:this.urgence,
              probleme:this.probleme,
              description:this.description
            }

            this.tickets.push(this.newTicket);

            console.log(this.newTicket)
            console.log(this.tickets)
          }
        },
        reset () {
          this.$refs.form.reset()
        },
      },
    }
</script>