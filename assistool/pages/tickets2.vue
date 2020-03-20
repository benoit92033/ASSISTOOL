<style>
/*
.add-form {
  max-width: 30vw;
}

.description {
  background-color: #323232;
  padding: 20px;
  margin-bottom: 20px;
}

table {
  border: 2px solid #0D47A1;
  border-radius: 3px;
  background-color: rgb(0, 0, 0);
}

th {
  background-color: rgb(42, 86, 151);
  color: rgb(226, 226, 226);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #646464;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}
*/
</style>

<template>
  <v-layout row justify-center>

  <v-container class="mb-6">
      <p align="center" class="display-3 font-weight-light">Nouveau ticket</p>
      <p>{{ $store.state.authUser[0].username }}</p>

      <v-container fluid class="add-form">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="title"
            :rules="[v => !!v || 'Titre requis']"
            label="Titre"
            required
          ></v-text-field>

          <v-flex class="d-flex">
            <v-text-field
              v-model="poste"
              :rules="[v => !!v || 'Numéro du poste requis']"
              label="Poste"
              required
            ></v-text-field>

            <v-col class="mx-auto">
              <v-select
                v-model="urgence"
                :items="urgences"
                :rules="[v => !!v || 'Urgence requise']"
                label="Urgence"
                dense
                required
              ></v-select>
            </v-col>
          </v-flex>

          <v-col class="mx-auto">
            <v-select
              v-model="probleme"
              :items="problemes"
              :rules="[v => !!v || 'Problème requis']"
              label="Problème"
              dense
              required
            ></v-select>
          </v-col>

          <v-textarea
            v-model="description"
            class="description"
            label="Description"
            :rules="[v => !!v || 'Description requise']"
            auto-grow
          ></v-textarea>

          <v-flex class="d-flex justify-center mb-6">
            <v-btn style="margin: 10px;" x-large :disabled="!valid" color="success" @click="validate">Envoyer</v-btn>
            <v-btn style="margin: 10px;" x-large color="error" @click="reset">Annuler</v-btn>
          </v-flex>
        </v-form>
      </v-container>
    </v-container>

 <v-container class="mb-6">
      <p align="center" class="display-3 font-weight-light">Ticket en cours</p>
    <v-simple-table fluid align="center">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Urgence</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticket, i) in $store.state.tickets" :key="`${i}-${tickets.id_ticket}`">
          <td>{{ ticket.titre }}</td>
          <td center>
            <v-btn v-if="ticket.urgence == 1" depressed large rounded style="margin: 10px;width: 100%; pointer-events: none;" color="success" >
              Pas urgent
            </v-btn>

            <v-btn v-else-if="ticket.urgence == 2 || ticket.urgence == 3" depressed large rounded style="margin: 10px;width: 100%; pointer-events: none;" color="warning" >
              Urgent
            </v-btn>

            <v-btn v-else depressed large rounded style="margin: 10px;width: 100%; pointer-events: none;" color="error" >
              Très Urgent
            </v-btn>
          </td>
          <td>
            <v-btn
            style="margin: 10px;"
            rounded
            large
            color="primary"
            @click="commenter(ticket.id_ticket)"
          >Commenter</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container >
  </v-layout>
</template>
<script>
export default {
  middleware: ['auth','demandeur'],

  data: () => ({
    valid: true,

    title: '',

    poste: '',

    description: '',

    urgence: 1,

    probleme: null,

    tickets: [
      // {id:"0", title:"Ecran cassé", priority: "0"},
      // {id:"1", title:"Bug souris", priority: "1"},
      // {id:"2", title:"Bug microsoft word", priority: "2"}
    ],
    urgences: [1, 2, 3, 4, 5],
    problemes: ['Logiciel', 'Materiel', 'Utilisateur']
  }),

  methods: {
    async getTickets() {
      try {

        await this.$store.dispatch('getTickets', {
          }).then((response) => { // seulement si les logins sont bons
          })
          console.log(tickets)
      } catch (e) {
        this.formError = e.message
      }
    },

    async validate() {

      let user = this.$store.state.authUser[0].user[0];

      if (this.$refs.form.validate()) {
        this.snackbar = true

        let newTicket = {
          id_user : user.id_user,
          title: this.title,
          poste: this.poste,
          priority: this.urgence,
          probleme: this.probleme,
          description: this.description
        }

         try {
          await this.$store.dispatch('newTicket', newTicket).then((response) => {
              this.getTickets();
            })
        } catch (e) {
          this.formError = e.message
        }
      }
    },
    reset() {
      this.$refs.form.reset()
    },


  },
  created() {
      this.getTickets();
    }
}
</script>
