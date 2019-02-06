import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { GuardService } from './services/guard.service';

import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { PortadaComponent } from './portada/portada.component';
import { FirestoreService } from './services/firestore/firestore.service';
import { HeaderComponent } from './header/header.component';
import { AddcatComponent } from './addcat/addcat.component';
import { EditcatComponent } from './editcat/editcat.component';
import { RegistroComponent } from './logueo/registro/registro.component';
import { LoginComponent } from './logueo/login/login.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path: '', component: PortadaComponent},
  {path: 'cats', component: CatsComponent,
    canActivate: [GuardService] },
  {path: 'addcat', component: AddcatComponent,
  canActivate: [GuardService] },
  {path: 'editcat/:id', component: EditcatComponent,
  canActivate: [GuardService] },
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
  {path: '**', component: PortadaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    PortadaComponent,
    HeaderComponent,
    AddcatComponent,
    EditcatComponent,
    RegistroComponent,
    LoginComponent,
    ChatComponent

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [FirestoreService, AngularFireStorageModule, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
