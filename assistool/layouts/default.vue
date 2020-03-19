<template>
  <v-app dark>
    
    <v-app-bar :clipped-left="clipped" color="grey darken-3" fixed app>

      <v-toolbar-title v-text="title" />  

      <v-spacer></v-spacer> 

      <v-btn v-if="this.$store.state.authUser[0].isLogged" color="deep-orange darken-1" @click="logout">Se deconnecter</v-btn>   

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
        this.$router.push('login')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
