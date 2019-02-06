import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LogueoService {

  constructor(private router: Router) { }


  async registroUsuario(user) {
    const registro = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    return registro;

  }

  async inicioSesion(user) {
    const login = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    return login;
  }

isAuthenticated() {
  const user = firebase.auth().currentUser;

  if (user) {
    return true;
  } else {
    return false;
  }
}

logout() {
  firebase.auth().signOut();
}

/*loginGoogle() {
  return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() );

  // return firebase.auth( new firebase.auth.GoogleAuthProvider() );
}*/


}
