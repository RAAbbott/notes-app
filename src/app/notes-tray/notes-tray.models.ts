export interface Note {
  title: string;
  id?: number;
  body: string;
  bodyPreview: string;
  createDate: string;
  lastModified?: string;
  recording?: any;
}
