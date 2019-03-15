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

  initiateNoteListAndCurrentNote() {
    if (localStorage.length === 0) {
      // this.zeroNotes = true;
    } else {
      // this.zeroNotes = false;
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

  updateList(data: Note[], action: string) {
    this.notesList.next(data);
    if (action === 'add') {
      console.log('note added to list has this value: ', this.notesList.value[this.notesList.value.length - 1]);
      this.currentNote.next(this.notesList.value[this.notesList.value.length - 1]);
      console.log(this.currentNote);
    } else if (action === 'delete') {
      this.currentNote.next(this.notesList.value[0]);
    } else if (action === 'emptyNotes') {
      return;
    }
  }

  updateCurrentNote(note: Note) {
    this.currentNote.next(note);
    const noteVal = this.currentNote.value;
    const listVal = this.notesList.value;
    const newNotesList = [].concat(listVal);
    for (let i = 0; i < listVal.length; i++) {
      if (newNotesList[i].id === noteVal.id) {
        newNotesList[i] = noteVal;
      }
    }
    console.log('new notes list: ', newNotesList);
    this.notesList.next(newNotesList);
  }

}
