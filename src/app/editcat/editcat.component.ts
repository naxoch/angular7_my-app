import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editcat',
  templateUrl: './editcat.component.html',
  styleUrls: ['./editcat.component.css']
})
export class EditcatComponent implements OnInit {

  id: string;
  cat;
  editcatForm: FormGroup;


  constructor(
    private editcatBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private route2: Router
    ) {
      this.editcatForm = this.editcatBuilder.group({
        nombre: [ '', [ Validators.required ] ],
        id: ''
        });

     }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.firestoreService.getCat(this.id).subscribe((cat) => {
      this.cat = cat.payload.data();
      this.editcatForm.setValue({
        id: this.id,
        nombre: this.cat.nombre
      });

    });
  }


  editCat(formValue) {
    this.firestoreService.updateCat(
      this.id,
      { nombre: formValue.nombre,
        url: this.cat.url}
    );

    this.route2.navigate(['/cats']);
 }




}
