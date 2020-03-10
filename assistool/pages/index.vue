<template>
  <v-layout column justify-center align-center >

    <v-flex xs12 sm8 md6 >

      <div class="text-center">
        <logo />
      </div>

      <v-card>
        <v-card-title class="headline">
          Bienvenue dans Assistool
        </v-card-title>

        <v-card-text>
          <p>Le 1er outil de maintenance en France</p>
        </v-card-text>

        <v-card-actions>
          <v-flex class="text-center">
            <v-btn color="primary" nuxt to="/login" >Se connecter</v-btn>
            <v-btn color="warning" nuxt to="/tickets2" >Page add ticket</v-btn>
          </v-flex>
        </v-card-actions>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
