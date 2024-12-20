import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { LanyardComponent } from './app/lanyard/lanyard.component';

bootstrapApplication(LanyardComponent, {
  providers: [provideHttpClient()] // Add HttpClient support here
});
