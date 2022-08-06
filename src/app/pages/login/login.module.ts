import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { appRotasLogin } from './login.routes';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(appRotasLogin)
  ]
})
export class LoginModule { }
