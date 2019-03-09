import { Component, OnInit } from '@angular/core';
import { NoteClass } from '../app.models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesDataService } from '../shared/notes-data.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Observable } from 'rxjs';
import { Note } from '../app.models';

@Component({
  selector: 'app-notes-tray',
  templateUrl: './notes-tray.component.html',
  styleUrls: ['./notes-tray.component.css']
})
export class NotesTrayComponent implements OnInit {
  notes$: Observable<NoteClass[]>;
  notes: Note[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesDataService: NotesDataService,
  ) {
    this.notesDataService.init();
    this.notes$ = this.notesDataService.notesList.asObservable();
  }

  ngOnInit() {
    this.notes$.subscribe((val) => {
      this.notes = val;
    });
  }

  addNote() {
    console.log('addNote()');
    const numNotes = this.notes.length;
    const newNote = new NoteClass(numNotes + 1);
    this.notes.push(newNote);
    localStorage.setItem(`${newNote.id}`, JSON.stringify(newNote));
  }

  setCurrentNote(note: Note) {
    this.notesDataService.currentNote.next(note);
    console.log('current Note = ', note);
  }

  deleteNote(id) {
    console.log('route param: ', this.activatedRoute.snapshot.params);
    if (confirm('Are you sure you want to delete this note?')) {
      localStorage.removeItem(id);
      const newNotes = this.notes.splice(id - 1, 1);
      this.notesDataService.notesList.next(newNotes);
      if (this.activatedRoute.snapshot.paramMap.get('noteId') === `${id}`) {
        this.router.navigateByUrl('notes/1', { skipLocationChange: true });
      }
    } else {
      return;
    }
  }
}
