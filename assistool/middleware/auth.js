export default function ({ store, redirect }) {
    // Si l'utilisateur n'est pas authentifié
    if (!store.state.authUser[0].isLogged) {
      return redirect('/login')
    }
  }