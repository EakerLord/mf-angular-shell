import { inject, Injectable, NgZone, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  loadedUserPlaces = this.userPlaces.asReadonly();

  private ngZone = inject(NgZone);

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Something went wrong fetching the available places. Please try again later.');
  };

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Something went wrong fetching your favorites places. Please try again later.')
      .pipe(
        tap({
          next: (places) => this.userPlaces.set(places)
        })
      );
  };

  addPlaceToUserPlaces(place: Place) {
    return this.httpClient.put<{userPlaces: Place[]}>('http://localhost:3000/user-places', {placeId: place.id})
      .pipe(
        tap(
          response => {this.userPlaces.set(response.userPlaces)}
        ),
        catchError((error) => {
          this.showErrorInAngularZone('PlacesService --> Failed to store selected place. Please try again later.');
          return throwError(() => new Error(error.message));
        })
      );
  };

  removeUserPlace(place: Place) {
    return this.httpClient.delete<{userPlaces: Place[]}>('http://localhost:3000/user-places/' + place.id)
      .pipe(
        tap(
          response => {this.userPlaces.set(response.userPlaces)}
        ),
        catchError((error) => {
          this.showErrorInAngularZone('PlacesService --> Failed to remove selected place. Please try again later.');
          return throwError(() => new Error(error.message));
        })
      );
  };

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{places: Place[]}>(url)
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          this.showErrorInAngularZone(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      )
  };

  private showErrorInAngularZone(message: string): void {
    this.ngZone.run(() => {
      console.log('Error from the places.service in the host app -->',message);
    });
  }
}
