export interface Note {
  title: string;
  id?: number;
  body: string;
  bodyPreview: string;
  createDate: string;
  lastModified?: string;
  recording?: any;
}

export class NoteClass {
  title: string;
  id: number;
  body: string;
  bodyPreview: string;
  createDate: string;
  lastModified?: string;
  recording?: any;
  constructor(id = 1, title = 'Title', body = 'Notes Body', bodyPreview = 'Preview', createDate = 'Date') {
    console.log(id, title, body);
    this.id = id;
    this.title = title;
    this.body = body;
    this.bodyPreview = bodyPreview;
    this.createDate = createDate;
  }
}
