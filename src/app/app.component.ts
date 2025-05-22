import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PlacesService } from '../services/places.service';
@Component({
  selector: 'app-root-angular-shell',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mf-angular-shell';
  placesService = inject(PlacesService); // Inject instance is needed to use the service in the remotes.
}
