import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebasestorageService {

  constructor(private fstorage: AngularFireStorage) { }

  // Tarea para subir archivo
   tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.fstorage.upload(nombreArchivo, datos);
  }

  // Referencia del archivo
  referenciaCloudStorage(nombreArchivo: string) {
    return this.fstorage.ref(nombreArchivo);
  }

  deleteCloudStorage(pathArchivo: string) {

    const ref = this.fstorage.ref(pathArchivo);

    ref.delete();
  }


}
