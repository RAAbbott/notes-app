import { NoteConstructor } from './../app.models';
import { Component, OnInit } from '@angular/core';
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
  notes$: Observable<Note[]>;
  currentNote$: Observable<Note>;
  notes: Note[];

  zeroNotes: boolean;

  constructor(
    private notesDataService: NotesDataService
  ) {
    this.notes$ = this.notesDataService.notesList.asObservable();
    this.currentNote$ = this.notesDataService.currentNote.asObservable();
    this.notesDataService.initiateNoteListAndCurrentNote();
  }

  ngOnInit() {
    this.subscribeToNotesList();
    console.log('notes list on startup: ', this.notes);
  }

  defaultNote() {
    return new NoteConstructor(1, 'My First Note', 'This is my first note!');
  }

  subscribeToNotesList() {
    this.notes$.subscribe(val => {
      if (val.length === 0) {
        this.zeroNotes = true;
      } else {
        this.notes = val;
        this.zeroNotes = false;
      }
    });
  }

  // This method creates a new note and adds it to the local notes list, updates the behavior subject, and adds note to localStorage
  addNote() {
    if (this.zeroNotes) {
      const defaultNote = this.defaultNote();
      localStorage.setItem(`${defaultNote.id}`, JSON.stringify(defaultNote));
      this.notesDataService.updateList([defaultNote], 'add');
      this.zeroNotes = false;
    } else {
      const numNotes = this.notes.length;
      const newNote = new NoteConstructor(
        numNotes + 1,
        'Default Title',
        'Default Text',
      );
      this.notes.push(newNote);
      this.notesDataService.updateList(this.notes, 'add');
      localStorage.setItem(`${newNote.id}`, JSON.stringify(newNote));
    }
  }

  // Updates the currentNote behavior subject, which lets note-pad component know which note to display
  setCurrentNote(note: Note) {
    this.notesDataService.currentNote.next(note);
    console.log('current Note = ', note);
    console.log(this.notes);
  }

  // Removes note from list and localStorage
  deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
      localStorage.removeItem(id);
      const noteToRemove = this.notes.filter(note => note.id === id);
      this.notes.splice(this.notes.indexOf(noteToRemove[0]), 1);
      this.notesDataService.updateList(this.notes, 'delete');
    } else {
      return;
    }
  }
}
