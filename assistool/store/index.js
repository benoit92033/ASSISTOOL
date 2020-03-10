export const state = () => ({
    authUser: [{
        isLogged:false, username:''
    }]
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

    loggin(state,username) {
        state.authUser[0].isLogged = true;
        state.authUser[0].username = username;
        console.log(state.authUser[0].username)
    },

    logout(state) {
        state.authUser[0].isLogged = false;
    },

    getAuthData(state) {
        return state.authUser[0];
    }
}

export const actions = {
    login({commit}, loginForm) {
        commit('loggin',loginForm.email);
        console.log(loginForm.email)
        return commit('getAuthData');

        // return new Promise((resolve, reject) => {
        //     // Do something here... lets say, a http call using vue-resource
        //     this.$http("/api/something").then(response => {
        //         // http success, call the mutator and change something in state
        //         resolve(response);  // Let the calling function know that http is done. You may send some data back
        //     }, error => {
        //         // http failed, let the calling function know that action did not work out
        //         reject(error);
        //     })
        // })
    },

    logout({commit}) {
        commit('logout');
    }
}