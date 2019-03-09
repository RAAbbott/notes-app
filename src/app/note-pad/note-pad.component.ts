import { NotesDataService } from './../shared/notes-data.service';
import { NoteClass, Note } from '../app.models';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { fbind } from 'q';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-pad',
  templateUrl: './note-pad.component.html',
  styleUrls: ['./note-pad.component.css']
})
export class NotePadComponent implements OnInit {
  currentNote$: Observable<Note>;
  currentNote: Note;

  // Form Control Variables
  noteFormGroup = this.fb.group({
    notesTitle: [''],
    notesBody: [''],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: NotesDataService,
    private fb: FormBuilder,
  ) {
    this.currentNote$ = this.data.currentNote.asObservable();
   }

  ngOnInit() {
    this.currentNote$.subscribe((val) => this.currentNote = val);
    this.setFormControlToCurrentNote();
    this.formControlSubscription();
  }

  setFormControlToCurrentNote() {
    this.notesTitle.setValue(this.currentNote.title);
    this.notesBody.setValue(this.currentNote.body);
  }

  formControlSubscription() {
    this.noteFormGroup.valueChanges.pipe(debounceTime(1000)).subscribe((newNote) => {
      console.log(newNote);
      this.data.currentNote.next(newNote);
      // this.data.currentNote.bodyPreview = newBody.split('').splice(0, 12).join('') + '...';
      localStorage.setItem(`${this.currentNote.id}`, JSON.stringify(this.currentNote));
    });
  }

  // getNoteFromNoteID() {
  //    this.data.notes.forEach((note) => {
  //      if (note.id === +this.noteId) {
  //        this.currentNote = note;
  //        this.notesBody.setValue(this.currentNote.body);
  //      }
  //    });
  //    console.log('yeet', this.currentNote);

  // }

  get notesTitle() {
    return this.noteFormGroup.get('notesTitle') as FormControl;
  }

  get notesBody() {
    return this.noteFormGroup.get('notesBody') as FormControl;
  }

}
