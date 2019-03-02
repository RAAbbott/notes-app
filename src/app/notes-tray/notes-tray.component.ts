import { Component, OnInit } from '@angular/core';
import {Note} from './notes-tray.models';
import {ActivatedRoute, Router} from "@angular/router";
import {NotesTrayHttpService} from "./notes-tray.http.service";

@Component({
  selector: 'app-notes-tray',
  templateUrl: './notes-tray.component.html',
  styleUrls: ['./notes-tray.component.css']
})
export class NotesTrayComponent implements OnInit {
  notes: Note[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesTrayHttpService: NotesTrayHttpService,
  ) {}


  ngOnInit() {
    this.notes = this.notesTrayHttpService.notes;
    console.log('NotesTray hit');
    console.log(this.router);
  }

  goToNote(noteId) {
    this.router.navigate([`notes/${noteId}`]);
  }

  addNote() {
    const numNotes = this.notes.length;
  }

}
