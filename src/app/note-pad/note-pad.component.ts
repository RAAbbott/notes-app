import { NotesDataService } from './../shared/notes-data.service';
import { Note } from '../app.models';
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

  // Other variables
  zeroNotes = false;

  constructor(
    private data: NotesDataService,
    private fb: FormBuilder,
  ) {
    this.currentNote$ = this.data.currentNote.asObservable();
   }

  ngOnInit() {
    this.subscribeToCurrentNote();
    this.setFormControlToCurrentNote();
    this.formControlSubscription();
  }

  subscribeToCurrentNote() {
    this.currentNote$.subscribe((val) => {
      if (val != null) {
        this.currentNote = val;
      } else {
        this.zeroNotes = true;
      }
    });
  }

  setFormControlToCurrentNote() {
    this.notesTitle.setValue(this.currentNote.title);
    this.notesBody.setValue(this.currentNote.body);
  }

  formControlSubscription() {
    this.noteFormGroup.valueChanges.pipe(debounceTime(1000)).subscribe((newNote) => {
      console.log('change detected');
      console.log(newNote);
      this.data.currentNote.next(newNote);
      // this.data.currentNote.bodyPreview = newBody.split('').splice(0, 12).join('') + '...';
      localStorage.setItem(`${this.currentNote.id}`, JSON.stringify(this.currentNote));
    });
  }

  get notesTitle() {
    return this.noteFormGroup.get('notesTitle') as FormControl;
  }

  get notesBody() {
    return this.noteFormGroup.get('notesBody') as FormControl;
  }

}
