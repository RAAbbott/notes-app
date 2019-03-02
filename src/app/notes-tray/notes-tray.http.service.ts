import {Injectable, OnInit} from '@angular/core';
import {Note} from "./notes-tray.models";

@Injectable({
  providedIn: 'root'
})
export class NotesTrayHttpService implements OnInit {
  notes = [
    {
      title: 'Note #1',
      id: 1,
      body: 'This is my first note! What do you think?',
      bodyPreview: 'This is my first note...',
      createDate: '2019-2-12',
      lastModified: '2019-2-13',
    },
    {
      title: 'Note #2',
      id: 2,
      body: 'This is my second note! What do you think? I like it better than the first one, it\'s a little longer though',
      bodyPreview: 'This is my second note...',
      createDate: '2019-2-13',
      lastModified: '2019-2-13',
    },
    {
      title: 'Note #3',
      id: 3,
      body: 'This is my third note! What do you think? I like it better than the first one, it\'s a little longer though',
      bodyPreview: 'This is my third note...',
      createDate: '2019-2-13',
      lastModified: '2019-2-13',
    },{
      title: 'Note #3',
      id: 4,
      body: 'This is my third note! What do you think? I like it better than the first one, it\'s a little longer though',
      bodyPreview: 'This is my third note...',
      createDate: '2019-2-13',
      lastModified: '2019-2-13',
    },{
      title: 'Note #3',
      id: 5,
      body: 'This is my third note! What do you think? I like it better than the first one, it\'s a little longer though',
      bodyPreview: 'This is my third note...',
      createDate: '2019-2-13',
      lastModified: '2019-2-13',
    },{
      title: 'Note #3',
      id: 6,
      body: 'This is my third note! What do you think? I like it better than the first one, it\'s a little longer though',
      bodyPreview: 'This is my third note...',
      createDate: '2019-2-13',
      lastModified: '2019-2-13',
    }

  ];

  constructor() {
  }

  ngOnInit(){
  }


}
