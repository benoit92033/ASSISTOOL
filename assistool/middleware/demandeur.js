export default function ({ store, redirect }) {

    // Si l'utilisateur n'est pas un operateur
    switch(store.state.authUser[0].user[0].role) {
        case "operateur":
                return redirect('/operateur')
            break;

        case "responsable":
                return redirect('/responsable')
            break;
    }
  }