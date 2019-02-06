import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogueoService } from '../../services/logueo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logForm: FormGroup;
  user: any;
  error_message: string;
  cargar = false;


  constructor(private formBuilder: FormBuilder,
              private logueoService: LogueoService,
              private router: Router) { }

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      email: [ '', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) ]
      ],
      password: [ '', [ Validators.required ] ]
      });
  }

  login(logForm) {
    this.error_message = '';
    this.user = this.logForm.value;

    this.logueoService.inicioSesion(this.user).then(response => {

      if ( this.isAuth() === true) {
        setTimeout( () => {
          this.router.navigate(['/']);
        } , 1000);
      } else {
        this.cargar = false;
        this.error_message = 'Algo no va bien...';
      }
      }).catch(
        error => {
        this.cargar = false;
        this.error_message = 'Email inválido o la contraseña no coincide.';
      });


  }

  isAuth() {
    return this.logueoService.isAuthenticated();
  }

  /*onClickGoogle() {
    this.logueoService.loginGoogle().then( resolve => {
      setTimeout( () => {
        this.router.navigate(['/']);
      } , 1000);
    }).catch(error => console.log(error.message));
  }*/


}
