import { debounceTime } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { Note, NoteConstructor } from '../app.models';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NotesDataService implements OnInit {
  notesList = new BehaviorSubject<Note[]>([]);
  currentNote = new BehaviorSubject<Note>(null);


  constructor() {
  }

  ngOnInit() {
  }

  defaultNote = () => new NoteConstructor(1, 'Title', 'Body');

  initiateNoteListAndCurrentNote() {
    if (localStorage.length === 0) {
      const defaultNote = this.defaultNote();
      localStorage.setItem(`${defaultNote.id}`, JSON.stringify(defaultNote));
      this.notesList.next([defaultNote]);
      this.currentNote.next(defaultNote);
    } else {
      const allNotes = [];
      const noteIds = Object.keys(localStorage);
      console.log(noteIds);
      for (let i = 0; i < noteIds.length; i++) {
        console.log('note from localStorage:', localStorage.getItem(`${noteIds[i]}`));
        const note = localStorage.getItem(`${noteIds[i]}`);
        allNotes.push(JSON.parse(note));
      }
      this.notesList.next(allNotes);
    }
    this.currentNote.next(this.notesList.value[0]);
    console.log(this.currentNote.value);
  }

  updateList(data: Note[]) {
    this.notesList.next(data);
    this.currentNote.next(this.notesList.value[0]);
    console.log('currentNote: ', this.currentNote.value);
    console.log('notesList: ', this.notesList.value);
  }

}
