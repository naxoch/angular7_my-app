import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore/firestore.service';
import { ActivatedRoute, RoutesRecognized, Router} from '@angular/router';
import { FirebasestorageService } from '../services/firebasestorage.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Promise } from 'q';

@Component({
  selector: 'app-addcat',
  templateUrl: './addcat.component.html',
  styleUrls: ['./addcat.component.css']
})
export class AddcatComponent implements OnInit {
  barra = false;
  catForm: FormGroup;
  number = 0;
  cat: any;
  cargar = false;

  fichero: any;
  path: string;
  ref: any;
  tarea: any;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  errorImg: any;


  constructor(
    private catBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private firebaseStorage: FirebasestorageService,
    private router: Router) { }

  ngOnInit() {
    this.catForm = this.catBuilder.group({
    nombre: [ '', [ Validators.required ] ],
    imagen: [ '', [ Validators.required ] ],
    id: ''
    });

  }

  subirImagen() {

    this.ref = this.firebaseStorage.referenciaCloudStorage(this.path);

    this.tarea = this.firebaseStorage.tareaCloudStorage(this.path, this.fichero);

    this.uploadPercent = this.tarea.percentageChanges();

    return this.tarea;
  }

  newCat(formValue: any) {

    this.subirImagen().then( () => {
      this.tarea.snapshotChanges().pipe( finalize( () => this.urlImage = this.ref.getDownloadURL() )).subscribe();
    }).then( () => {
      this.urlImage.toPromise().then( resolve => {
        this.firestoreService.createCat(
          { nombre: formValue.nombre,
            url: resolve,
            imgNombre: this.path }
        );
        setTimeout( () => {
          this.router.navigate(['/cats']);
        } , 1000);
      }).catch (error => {
        this.errorImg = error;
        this.cargar = false;
      });

    }).catch( error => {
      this.errorImg = error;
      this.cargar = false;
    });

  }


  onChange(e) {
    console.log(1, e.target.files[0]);

    const id = Math.random().toString(36).substring(2);
    this.fichero = e.target.files[0];
    this.path = 'upload/' + id;


  }






}
