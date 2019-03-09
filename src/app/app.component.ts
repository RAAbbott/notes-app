import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-songwriter-app';
  header = 'Simple Songwriter...';

  clearLocalStorage() {
    localStorage.clear();
  }
}
