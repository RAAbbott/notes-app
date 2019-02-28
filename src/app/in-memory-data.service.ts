import { Injectable } from '@angular/core';
import {Note} from './notes-tray/notes-tray.models';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const notes = [
      {
        title: 'Note #1',
        id: 1,
        body: 'This is my first note! What do you think?',
        createDate: '2019-2-12',
        lastModified: '2019-2-13',
      },
      {
        title: 'Note #2',
        id: 2,
        body: 'This is my second note! What do you think? I like it better than the first one, it\'s a little longer though',
        createDate: '2019-2-13',
        lastModified: '2019-2-13',
      },
      {
        title: 'Note #3',
        id: 3,
        body: 'This is my second note! What do you think? I like it better than the first one, it\'s a little longer though',
        createDate: '2019-2-13',
        lastModified: '2019-2-13',
      },
    ];

    return notes;
  }
}
