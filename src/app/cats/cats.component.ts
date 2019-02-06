import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { FirebasestorageService } from '../services/firebasestorage.service';


@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  public cats = [];
  public id: string;
  imagen: string;


  constructor( private firestoreService: FirestoreService,
               private firebaseStorage: FirebasestorageService) { }

  ngOnInit() {

    this.firestoreService.getCats().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        this.cats.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      });
    });
  }

  catDelete(documentId: any) {

    const cat = this.firestoreService.getCat2(documentId);

    cat.get().toPromise().then( catData => {

      this.firebaseStorage.deleteCloudStorage(catData.data().imgNombre);
      this.firestoreService.deleteCat(documentId);

  }).catch(function(error) {
      console.log('Error getting document:', error);
  });


  }


}
