<template>
  <v-app dark>

    <v-app-bar :clipped-left="clipped" color="grey darken-3" fixed app>

      <v-spacer></v-spacer>

      <v-btn v-if="comment" color="blue lighten-3" @click="retour" class="retour">Retour</v-btn>
      <v-btn v-if="adminLog" color="blue lighten-3" @click="goToStat" class="retour">Statistiques</v-btn>
      <v-btn v-if="respOnStat" color="blue lighten-3" @click="goToResp" class="retour">Retour</v-btn>

      <v-toolbar-title v-text="title" />

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-flex v-if="this.$store.state.authUser[0].isLogged" align-end>
        {{ this.$store.state.authUser[0].user[0].nom }} {{ this.$store.state.authUser[0].user[0].prenom }}     
        <v-btn color="deep-orange darken-1" @click="logout">Se deconnecter</v-btn>
      </v-flex>

    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>


    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} Assistool</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      right: true,
      menu: false,
      test:false,
      title: 'Assistool'
    }
  },

  methods: {
    logout() {
      try {
        this.$store.dispatch('logout')
        this.$router.go('login')
      } catch (e) {
        this.formError = e.message
      }
    },

    retour() {
      this.$router.push('operateur')
    },

    goToStat() {
      this.$router.push('responsable/statistiques')
    },

    goToResp() {
      this.$router.push('/responsable')
    }
  },

  computed:{
      comment(){
          return this.$route.path === '/comment'
      },

      adminLog(){
          return this.$route.path === '/responsable'
      },

      respOnStat(){
          return this.$route.path === '/responsable/statistiques'
      }
  }

}
</script>

<style>

.retour{
  margin-right: 50px;
}

</style>
