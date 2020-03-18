<style>
.login-form {
  max-width: 50vh;
}
</style>

<template>
  <v-layout>
    <v-flex class="text-center">
      <v-container fluid class="login-form">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field v-model="password" :type="'password'" label="Mot de passe" required></v-text-field>

          <v-btn :disabled="!valid" color="success" @click="login">Valider</v-btn>
          <v-btn color="error" @click="reset">Annuler</v-btn>
          <v-btn
            v-if="$store.state.authUser[0].isLogged"
            color="warning"
            nuxt
            to="/tickets2"
          >Acceder aux tickets</v-btn>
        </v-form>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: 'antoine@assistool.com',
    emailRules: [
      v => !!v || "L'e-mail doit etre renseignée",
      v => /.+@.+\..+/.test(v) || "L'e-mail n'est pas correcte"
    ],
    password: 'antoine'
  }),

  methods: {
    async login() {
      try {
        if (this.$refs.form.validate()) {
          this.snackbar = true

          await this.$store.dispatch('login', {

              email: this.email,
              password: this.password

            }).then(response => {
              // seulement si les logins sont bons
              switch (this.$store.state.authUser[0].user[0].role) {
                case 'demandeur':
                  this.$router.push('tickets2')
                  break
                case 'operateur':
                  this.$router.push('/operateur')
                  break
                case 'chef':
                  this.$router.push('/operateur')
                  break
              }
            })
        }
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    },

    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
