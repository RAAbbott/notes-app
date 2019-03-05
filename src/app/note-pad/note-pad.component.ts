import { NoteClass } from './../notes-tray/notes-tray.models';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesTrayHttpService} from '../notes-tray/notes-tray.http.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-note-pad',
  templateUrl: './note-pad.component.html',
  styleUrls: ['./note-pad.component.css']
})
export class NotePadComponent implements OnInit {
  noteId = 1;
  currentNote: NoteClass;

  // Form Control Variables
  notesTitle = new FormControl('');
  notesBody = new FormControl('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private notesTrayHttpService: NotesTrayHttpService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.noteId = val.noteId;
      this.getNoteFromNoteID();
    });
    this.setFormControlToCurrentNote();
    this.formControlSubscription();
  }

  setFormControlToCurrentNote() {
    this.notesTitle.setValue(this.currentNote.title);
    this.notesBody.setValue(this.currentNote.body);
  }

  formControlSubscription() {
    this.notesBody.valueChanges.pipe(debounceTime(1000)).subscribe((newBody) => {
      console.log(newBody);
      this.currentNote.body = newBody;
      this.currentNote.bodyPreview = newBody.split('').splice(0, 12).join('') + '...';
      console.log(localStorage);
      localStorage.setItem(`${this.currentNote.id}`, JSON.stringify(this.currentNote));
    });
    this.notesTitle.valueChanges.pipe(debounceTime(1000)).subscribe((newTitle) => {
      console.log(newTitle);
      this.currentNote.title = newTitle;
      console.log(localStorage);
      localStorage.setItem(`${this.currentNote.id}`, JSON.stringify(this.currentNote));
    });
  }

  getNoteFromNoteID() {
     this.notesTrayHttpService.notes.forEach((note) => {
       if (note.id === +this.noteId) {
         this.currentNote = note;
         this.notesBody.setValue(this.currentNote.body);
       }
     });
     console.log('yeet', this.currentNote);

  }

}
