import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore/firestore.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatForm: any;
  mensajes: any[];
  user: any;

  constructor(private firestoreService: FirestoreService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.chatForm = this.formBuilder.group({
      mensaje: [ '', [ Validators.required ] ]
    });

    this.firestoreService.getMensajes().subscribe((msjSnapshot) => {
      this.mensajes = [];
      msjSnapshot.forEach((msjData: any) => {
        if (msjData.payload.doc.data().time != null) {
          this.mensajes.push({
            user: msjData.payload.doc.data().user,
            mensaje: msjData.payload.doc.data().mensaje,
            time: msjData.payload.doc.data().time
          });
        }
      });
    });



  }



  chat(formValue) {

    /*firebase.auth().onAuthStateChanged( resolve => {
      resolve.toPromise( resol => {

      })
    })*/

    firebase.auth().onAuthStateChanged( user1 =>  {
      if (user1) {
        this.user = user1;
        console.log(user1);
        const msj = {
          user: this.user.email,
          mensaje: formValue.mensaje,
          time: firebase.firestore.FieldValue.serverTimestamp()
        };

        this.firestoreService.mensajeChat(msj);

        this.chatForm.reset();

      } else {
        console.log(1, user1);
      }
    });





  }

}
