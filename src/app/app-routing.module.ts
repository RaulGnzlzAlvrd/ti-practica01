import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaComponent } from './components/persona/persona.component';

const routes: Routes = [
  { path: '', component:PersonaComponent },
  { path: 'persona', component:PersonaComponent},

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
