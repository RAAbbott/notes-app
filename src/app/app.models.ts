import * as moment from 'moment';


export interface Note {
  title: string;
  id: number;
  body: string;
  bodyPreview: string;
  createDate: string;
  lastModified?: string;
  recording?: any;
}

export class NoteConstructor implements Note {
  constructor(id: number, title: string, body: string) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.bodyPreview = body.split('').splice(0, 12).join('') + '...';
    this.createDate = moment().format('MMMM-DD-YYYY');
  }
  title: string;
  id: number;
  body: string;
  bodyPreview: string;
  createDate: string;
}
