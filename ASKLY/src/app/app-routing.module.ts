import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header-component/header/header.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HeaderComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'details', component: SurveyDetailsComponent},
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
