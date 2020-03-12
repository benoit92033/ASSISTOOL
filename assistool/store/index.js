export const state = () => ({
    commitForm:[],
    authUser: [{
        isLogged:false,
        user:[]
    }],

    databaseUser:[]
  })

export const getters = {
    getAuthInformations: state => {
        return state.authUser[0];
    }
}
  
export const mutations = {
    increment (state) {
        state.counter++
    },

    logout(state) {
        state.authUser[0].isLogged = false;
    },

    saveForm(state,loginForm) {
        state.commitForm = loginForm;
    },

    checkUserExist(state,results) {
        let find = false;
        for(let user of results) {
                if(user.mail == state.commitForm.email && user.password == state.commitForm.password) {
                    find = true;
                    state.authUser[0].isLogged = true;
                    state.authUser[0].user[0] = user;
            }
        }
        if(!find) {
            commitForm = []
        }
    }
}

export const actions = {

    login({commit}, loginForm) {

        commit('saveForm',loginForm)

        return ( this.$axios.$get(`getUser`).then(response => {
            commit('checkUserExist', response)
        }) )
    },

    logout({commit}) {
        commit('logout');
    }
}