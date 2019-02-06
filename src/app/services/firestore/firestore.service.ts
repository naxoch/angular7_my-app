import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

    // Crea un nuevo gato
    public createCat(data: {nombre: string, url: string, imgNombre: string}) {
      return this.firestore.collection('cats').add(data);
    }

    public mensajeChat(data: {user: string, mensaje: string, time: any}) {
      return this.firestore.collection('chat').add(data);
    }

    // Obtiene un gatoz
    public getCat(documentId: string) {
      return this.firestore.collection('cats').doc(documentId).snapshotChanges();
    }

    public getCat2(documentId: string) {
      return this.firestore.collection('cats').doc(documentId);
    }

    // Obtiene todos los gatos
    public getCats() {
      return this.firestore.collection('cats').snapshotChanges();
    }

    public getMensajes() {
      return this.firestore.collection('chat', ref => ref.orderBy('time') ).snapshotChanges();
    }

    // Actualiza un gato
    public updateCat(documentId: string, data: any) {
      return this.firestore.collection('cats').doc(documentId).set(data);
    }

    // Borra un gato
    public deleteCat(documentId: string) {
      return this.firestore.collection('cats').doc(documentId).delete();
    }


}
