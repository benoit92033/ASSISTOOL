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
        </v-form>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: 'admin@admin.com',
    emailRules: [
      v => !!v || "L'e-mail doit etre renseignée",
      v => /.+@.+\..+/.test(v) || "L'e-mail n'est pas correcte"
    ],
    password: 'admin'
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
                case 'responsable':
                  this.$router.push('/responsable')
                  break
              }
            })
        }
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
