import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotesTrayComponent} from './notes-tray/notes-tray.component';
import {NotePadComponent} from './note-pad/note-pad.component';

const routes: Routes = [
  {
    path: 'notes',
    component: NotesTrayComponent,
  },
  {
    path: 'notes/:noteName',
    component: NotePadComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
