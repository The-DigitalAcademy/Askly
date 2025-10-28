import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormLogin } from './login-page/component/form-login/form-login';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,    
    FormLogin
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
