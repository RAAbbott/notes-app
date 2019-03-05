import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotesTrayComponent} from './notes-tray/notes-tray.component';
import {NotePadComponent} from './note-pad/note-pad.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes/1',
    pathMatch: 'full',
  },
  {
    path: 'notes/:noteId',
    component: NotePadComponent,
  },
  {
    path: '**',
    redirectTo: 'notes/1',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
