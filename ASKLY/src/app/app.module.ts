import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header-component/header/header.component';
import { ResultsComponent } from './results/results.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { AdminPageComponent } from './admin-page-component/admin-page/admin-page.component';

import { CreateSurveyCompoundComponent } from './create-survey-compound/create-survey-compound.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { SurveyComponent } from './component/survey-fill/survey/survey.component';
import { FormLogin } from './login-page/component/form-login/form-login';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,    
    FormLogin,
    SurveyComponent,
    SurveyDetailsComponent,
    HeaderComponent,
    ResultsComponent,
    MainPageComponent,
    AdminPageComponent,
    CreateSurveyCompoundComponent
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
