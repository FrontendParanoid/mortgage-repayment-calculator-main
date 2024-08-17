import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PassFormDataService } from './services/pass-form-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [PassFormDataService],
})
export class AppComponent {
  title = 'program';
}
