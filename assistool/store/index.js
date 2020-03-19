export const state = () => ({
  authUser: [
    {
      isLogged: false,
      user: []
    }
  ],
  tickets: [],
  ticketsClose: [],
  id_Ticket: 0,
  comments: [],
})

export const getters = {
  getAuthInformations: state => {
    return state.authUser[0]
  },
  getUserInformations: state => {
    return state.authUser[0].user[0]
  }
}

export const mutations = {
  increment(state) {
    state.counter++
  },

  logout(state) {
    state.authUser[0].isLogged = false
    state.tickets = []
  },

  saveForm(state, loginForm) {
    state.commitForm = loginForm
  },

  checkUserExist(state,loginForm) {
        if(loginForm) {
            state.authUser[0].isLogged = true;
            state.authUser[0].user[0] = loginForm;
        }
    },

  checkTicketsExist(state, results) {
    state.tickets = results
  },

  checkTicketsCloseExist(state, results) {
    state.ticketsClose = results
  },

  checkCommentsExist(state, results) {
    state.comments = results
  },


  setTicketId(state, idtick) {
    this.state.id_Ticket = idtick ;

  },

  setSession(state,user) {
    state.authUser[0].isLogged = true;
    state.authUser[0].user[0] = user;
  }
}

export const actions = {

    async login({commit,state}, loginForm) {

        await this.$axios.$post(`/api/getUser`, loginForm).then(response => {
            commit('checkUserExist',response)
        })
    },

    async logout({commit,state}) {
      await this.$axios.$post(`/api/logout`)
      commit('logout')
    },

    newTicket({commit}, newTicket) {

        return ( this.$axios.$post(`/api/newTicket`, newTicket).then(response => {
            console.log("ticket store")
        }) )
    },

    getTickets({ commit, getters }) {
      return this.$axios
        .$post('/api/getTickets', {id_user: getters.getUserInformations.id_user})
        .then(response => {
          commit('checkTicketsExist', response)
        })
    },

    getTicketsClose({ commit, getters }) {
      return this.$axios
        .$post('/api/getTicketsClose', {id_user: getters.getUserInformations.id_user})
        .then(response => {
          commit('checkTicketsCloseExist', response)
        })
    },

  getComments({ commit }) {
    return this.$axios
      .$post('/api/getComments', {id_ticket : this.state.id_Ticket})
      .then(response => {
        commit('checkCommentsExist', response)
      })
  },

  setComment({state, getters}, commentaire  ) {

    return this.$axios.$post(`/api/postComments`, {id_Ticket: this.state.id_Ticket , id_user : getters.getUserInformations.id_user, commentaire: commentaire }).then(response => {

      if(response) {
           return true
      } else {
          return false;
      }
   })
  },

  closeTicket({state, getters}, idTick  ) {
    console.log(idTick)
    return this.$axios.$post(`/api/closeTicket`, {id_ticket: idTick}).then(response => {

      if(response) {
           return true
      } else {
          return false;
      }
   })
  },

    async nuxtServerInit({dispatch, commit}, {req}) {

        // Get session ID:
        const sessionId = req.session.id;

        console.log(sessionId)

        if(req.session.isLogged == true) {
          commit('setSession', req.session.user[0]);
        }

        // Or set initial cart state:
        /*if (session && session.cart) {
            dispatch('cart/setProducts', session.cart);
        }*/
    }

}
