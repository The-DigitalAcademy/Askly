import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header-component/header/header.component';
import { CreateSurveyCompoundComponent } from './create-survey-compound/create-survey-compound.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { AdminPageComponent } from './admin-page-component/admin-page/admin-page.component';
import { FormLogin } from './login-page/component/form-login/form-login';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HeaderComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'create-survey-compound', component: CreateSurveyCompoundComponent },
  { path: 'survey-details', component: SurveyDetailsComponent},
  { path: 'admin', component: AdminPageComponent},
  { path: 'login', component: FormLogin},
  // {},
  // {},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
