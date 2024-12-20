import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LanyardComponent } from './app/lanyard/lanyard.component';

@NgModule({
  declarations: [AppComponent, LanyardComponent],
  imports: [BrowserModule, HttpClientModule], // Import HttpClientModule here
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
