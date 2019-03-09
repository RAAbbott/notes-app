import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotePadComponent} from './note-pad/note-pad.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    path: 'notes',
    component: NotePadComponent,
  },
  {
    path: '**',
    redirectTo: 'notes',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
