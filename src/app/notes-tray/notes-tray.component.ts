import { Component, OnInit } from '@angular/core';
import {NoteClass} from './notes-tray.models';
import {ActivatedRoute, Router} from "@angular/router";
import {NotesTrayHttpService} from "./notes-tray.http.service";

@Component({
  selector: 'app-notes-tray',
  templateUrl: './notes-tray.component.html',
  styleUrls: ['./notes-tray.component.css']
})
export class NotesTrayComponent implements OnInit {
  notes: NoteClass[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesTrayHttpService: NotesTrayHttpService,
  ) {
    this.notesTrayHttpService.init();
  }


  ngOnInit() {
    this.notes = this.notesTrayHttpService.notes;
    console.log(this.notes);

    console.log('NotesTray hit');
    console.log(localStorage.length);
    console.log('localStorage: ', localStorage);
  }

  goToNote(noteId) {
    this.router.navigate([`notes/${noteId}`]);
  }

  addNote() {
    const numNotes = this.notes.length;
    const newNote = new NoteClass(numNotes + 1);
    this.notes.push(newNote);
    localStorage.setItem(`${newNote.id}`, JSON.stringify(newNote));
  }

  deleteNote(id) {
    console.log('deleting with id:', id);
    localStorage.removeItem(id);
    console.log(localStorage);
  }

}
