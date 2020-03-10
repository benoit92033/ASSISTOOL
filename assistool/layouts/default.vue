<template>
  <v-app dark>
    
    <v-app-bar :clipped-left="clipped" fixed app>

      <v-btn icon @click.stop="menu = !menu"> 
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />      

    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="menu" :left="true" temporary fixed>
      <v-list>

        <v-list-item @click.native="test = !test">

          <v-list-item-action>
            <v-icon light>
              mdi-home
            </v-icon>
          </v-list-item-action>

          <v-list-item-title>Home</v-list-item-title>

        </v-list-item>

        <v-list-item>

          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>

          <v-list-item-title>{{ test }}</v-list-item-title>

        </v-list-item>

      </v-list>
    </v-navigation-drawer>


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
  }
}
</script>
