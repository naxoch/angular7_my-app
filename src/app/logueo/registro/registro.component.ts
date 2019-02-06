import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogueoService } from '../../services/logueo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  regForm: FormGroup;
  user: any;
  error_email = false;
  email_message: string;
  cargar = false;

  constructor(private formBuilder: FormBuilder,
              private logueoService: LogueoService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      name: [ '', [ Validators.required ] ],
      email: [ '', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) ]
      ],
      password: [ '', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6) ] ]
      });
  }


  registrar(regForm) {
    this.error_email = false;
    this.email_message = '';
    this.user = this.regForm.value;

    this.logueoService.registroUsuario(this.user).then(response => {
        console.log(response);
        setTimeout( () => {
          this.router.navigate(['/']);
        } , 1000);
        }).catch(
          error => {
          this.cargar = false;
          if (error.message === 'The email address is already in use by another account.') {
            this.error_email = true;
            this.email_message = 'El correo ya está en uso.';
          } else {
            console.log('error-registro', error);
            this.error_email = true;
            this.email_message = 'Algo no ha funcionado.';
          }
        });


  }




}


