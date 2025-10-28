import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header-component/header/header.component';
import { ResultsComponent } from './results/results.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { AdminPageComponent } from './admin-page-component/admin-page/admin-page.component';

import { CreateSurveyCompoundComponent } from './create-survey-compound/create-survey-compound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultsComponent,
    MainPageComponent,
    AdminPageComponent,
    CreateSurveyCompoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
