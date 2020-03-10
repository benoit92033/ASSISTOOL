<style>
.login-form{
  max-width: 50vh;
}
</style>

<template>
  <v-layout>
    <v-flex class="text-center">
      
        <v-container fluid class="login-form">

          <Notification :message="error" v-if="error"/>

            <v-form ref="form" v-model="valid" lazy-validation >

                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field v-model="password" :type="'password'" label="Mot de passe" required></v-text-field>

                <v-btn :disabled="!valid" color="success" @click="validate">Valider</v-btn>
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
      email: '',
      emailRules: [
        v => !!v || 'L\'e-mail doit etre renseignée',
        v => /.+@.+\..+/.test(v) || 'L\'e-mail n\'est pas correcte',
      ],
      password:'',
    }),

    methods: {

      validate () {

        if (this.$refs.form.validate()) {
          this.snackbar = true

          if(this.email=='admin@admin.fr' && this.password == 'admin')
            location.replace('/tickets2')

        }
      },

      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>
