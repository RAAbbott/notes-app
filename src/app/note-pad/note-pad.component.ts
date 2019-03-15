import { NotesDataService } from './../shared/notes-data.service';
import { Note } from '../app.models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { fbind } from 'q';
import { Observable, pipe } from 'rxjs';

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
    notesBody: ['']
  });

  // Other variables
  saveIndicator = 'Saved';
  isSaving = false;

  constructor(private notesDataService: NotesDataService, private fb: FormBuilder) {
    this.currentNote$ = this.notesDataService.currentNote.asObservable();
  }

  ngOnInit() {
    this.subscribeToCurrentNote();
    this.setFormControlToCurrentNote();
    this.formControlSaveOnChange();
  }

  subscribeToCurrentNote() {
    this.currentNote$.subscribe(val => {
      if (val != null) {
        this.currentNote = val;
        this.setFormControlToCurrentNote();
      } else {
        this.notesDataService.updateList([], 'emptyNotes');
      }
    });
  }

  setFormControlToCurrentNote() {
    this.notesTitle.setValue(this.currentNote.title, { emitEvent: false });
    this.notesBody.setValue(this.currentNote.body, { emitEvent: false });
  }

  formControlSaveOnChange() {
    this.noteFormGroup.valueChanges
      .pipe(
        tap(val => {
          this.isSaving = true;
          this.saveIndicator = 'Typing...';
        }),
        debounceTime(1000)
      )
      .subscribe(val => {
        console.log(val);
        this.currentNote.title = val.notesTitle;
        this.currentNote.body = val.notesBody;
        this.currentNote.titlePreview =
          val.notesTitle
            .split('')
            .splice(0, 12)
            .join('') + '...';
        this.currentNote.bodyPreview =
          val.notesBody
            .split('')
            .splice(0, 12)
            .join('') + '...';
        console.log('updated Note: ', this.currentNote);
        this.notesDataService.updateCurrentNote(this.currentNote);
        localStorage.setItem(
          `${this.currentNote.id}`,
          JSON.stringify(this.currentNote)
        );
        this.saveIndicator = 'Saved';
        this.isSaving = false;
      });
  }

  get notesTitle() {
    return this.noteFormGroup.get('notesTitle') as FormControl;
  }

  get notesBody() {
    return this.noteFormGroup.get('notesBody') as FormControl;
  }
}
