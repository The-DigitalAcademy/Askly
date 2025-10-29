import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header-component/header/header.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { FormLogin } from './login-page/component/form-login/form-login';
import { AdminPageComponent } from './admin-page-component/admin-page/admin-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HeaderComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'details', component: SurveyDetailsComponent},
  { path: 'admin', component: AdminPageComponent},
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
