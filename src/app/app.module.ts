import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesTrayComponent } from './notes-tray/notes-tray.component';
import { NotePadComponent } from './note-pad/note-pad.component';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NotesTrayComponent,
    NotePadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // InMemoryDataService,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
