import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header-component/header/header.component';
import { AdminPageComponent } from './admin-page-component/admin-page/admin-page.component';
import { CreateSurveyCompoundComponent } from './create-survey-compound/create-survey-compound.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HeaderComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'create-survey', component: CreateSurveyCompoundComponent },
  // {},
  // {},
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
