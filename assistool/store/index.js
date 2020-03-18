export const state = () => ({
    authUser: [{
        isLogged:false,
        user:[]
    }],
    tickets:[],

    databaseUser:[]
  })

export const getters = {
    getAuthInformations: state => {
        return state.authUser[0];
    },
    getUserInformations: state => {
      return state.authUser[0].user[0];
  }
}

export const mutations = {
    increment (state) {
        state.counter++
    },

    logout(state) {
        state.authUser[0].isLogged = false;
        state.tickets = [];
    },

    saveForm(state,loginForm) {
        state.commitForm = loginForm;
    },

    checkUserExist(state,loginForm) {
        if(loginForm) {
            state.authUser[0].isLogged = true;
            state.authUser[0].user[0] = loginForm;
        }
    },

    checkTicketsExist(state,results) {
      state.tickets = results ;
  }
}

export const actions = {

    async login({commit,state}, loginForm) {

        await this.$axios.$post(`getUser`, loginForm).then(response => {
            commit('checkUserExist',response)
        })
    },

    newTicket({commit}, newTicket) {

        return ( this.$axios.$post(`newTicket`, newTicket).then(response => {
            console.log("ticket store")
        }) )
    },

    logout({commit}) {
        commit('logout');
    },

    getTickets({commit,getters}) {

      return ( this.$axios.$get(`getTickets?id_user=` +getters.getUserInformations.id_user).then(response => {
          commit('checkTicketsExist', response)
      }) )
    },

    async nuxtServerInit({dispatch, commit}, {req}) {
 
        // Get session ID:
        const sessionId = req.session.id;
 
        // Or set initial cart state:
        /*if (session && session.cart) {
            dispatch('cart/setProducts', session.cart);
        }*/
    }
}
