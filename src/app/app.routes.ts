import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Teste1Component } from './teste1/teste1.component';
import { Teste2Component } from './teste2/teste2.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'teste1', component: Teste1Component },
  { path: 'teste2', component: Teste2Component },
];

