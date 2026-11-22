import { Routes } from '@angular/router';
import { BreedingForms } from './breeding-forms/breeding-forms';
import { DCForms } from './dcforms/dcforms';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dcforms' },
  { path: 'dcforms', component: DCForms },
  { path: 'breeding-forms', component: BreedingForms },
];
