import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header-component/header/header.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { AdminPageComponent } from './admin-page-component/admin-page/admin-page.component';
import { CreateSurveyCompoundComponent } from './create-survey-compound/create-survey-compound.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { FormLogin } from './login-page/component/form-login/form-login';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'details', component: SurveyDetailsComponent},
  { path: 'admin', component: AdminPageComponent },
  { path: 'create-survey', component: CreateSurveyCompoundComponent },
  { path: 'register', component: RegisterPageComponent},
  { path: 'login', component: FormLogin},
  // {},
  // {},
  // {},
  // {},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
