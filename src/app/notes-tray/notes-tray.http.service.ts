import {Injectable, OnInit} from '@angular/core';
import { NoteClass } from './notes-tray.models';

@Injectable({
  providedIn: 'root'
})
export class NotesTrayHttpService implements OnInit {
  notes: NoteClass[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  init() {
    console.log('httpservice hit');
    if (localStorage.length === 0) {
      const defaultNote = new NoteClass();
      localStorage.setItem(`${defaultNote.id}`, JSON.stringify(defaultNote));
      this.notes.push(defaultNote);
    } else {
      for (let i = 1; i <= localStorage.length; i++) {
        const note = localStorage.getItem(`${i}`);
        this.notes.push(JSON.parse(note));
      }
    }
  }


}

