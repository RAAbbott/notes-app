export interface Note {
  title: string;
  id?: number;
  body: string;
  bodyPreview: string;
  createDate: string;
  lastModified?: string;
  recording?: any;
}

export class Note {
  title: string;
  id?: number;
  body: string;
  bodyPreview: string;
  createDate: string;
  lastModified?: string;
  recording?: any;
  constructor(title = 'Default', id = 0, body = 'Default', bodyPreview = 'Default', createDate = 'Default') {
    this.title = title;
    this.id = id;
    this.body = body;
    this.bodyPreview = this.bodyPreview;
    this.createDate = createDate;
  }
}
