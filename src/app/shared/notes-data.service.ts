import { debounceTime } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { NoteClass, Note } from '../app.models';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NotesDataService implements OnInit {
  notesList = new BehaviorSubject<Note[]>([]);
  currentNote = new BehaviorSubject<Note>(null);

  constructor() {}

  ngOnInit() {}

  init() {
    if (localStorage.length === 0) {
      console.log('hello');
      const defaultNote = {id: 1, title: 'Title', body: 'Body', bodyPreview: 'Body', createDate: moment().format('MMMM DD YYYY')};
      console.log('hello');
      localStorage.setItem(`${defaultNote.id}`, JSON.stringify(defaultNote));
      this.notesList.next([defaultNote]);
      this.currentNote.next(defaultNote);
    } else {
      const allNotes = [];
      for (let i = 1; i <= localStorage.length; i++) {
        const note = localStorage.getItem(`${i}`);
        allNotes.push(JSON.parse(note));
      }
      this.notesList.next(allNotes);
    }
    this.currentNote.next(this.notesList.value[0]);
  }
}
