import { effect, inject, Injectable, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  //(A >= 15) -> This aproach is used to create a service provider on the host.
  private httpClient = inject(HttpClient);

  private userPlacesSignal = signal<Place[]>([]);
  loadedUserPlaces = this.userPlacesSignal.asReadonly();
  private userPlacesSubject = new BehaviorSubject<Place[]>([]);
  loadedUserPlaces$ = this.userPlacesSubject.asObservable();

  constructor() {
    //(A >= 15) -> This effect is triggered when the userPlacesSignal changes and updates the userPlacesSubject.
    effect(() => {
      const current = this.userPlacesSignal();
      this.userPlacesSubject.next(current);
    });
  }

  /*(A <= 14) -> This method is used to update the userPlacesSignal and userPlacesSubject manually in eveery othe method wich update them.
  constructor(private httpClient: HttpClient) {}
  private updateUserPlaces(places: Place[]) {
    this.userPlacesSignal.set(places);
    this.userPlacesSubject.next(places); // sincronizar manualmente
  }*/

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Something went wrong fetching the available places. Please try again later.');
  };

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Something went wrong fetching your favorites places. Please try again later.')
      .pipe(
        tap({
          next: (places) => this.userPlacesSignal.set(places)
        })
      );
  };

  addPlaceToUserPlaces(place: Place) {
    return this.httpClient.put<{userPlaces: Place[]}>('http://localhost:3000/user-places', {placeId: place.id})
      .pipe(
        tap(
          response => {this.userPlacesSignal.set(response.userPlaces)}
        ),
        catchError((error) => {
          console.log('PlacesService --> Failed to store selected place. Please try again later.');
          return throwError(() => new Error(error.message));
        })
      );
  };

  removeUserPlace(place: Place) {
    return this.httpClient.delete<{userPlaces: Place[]}>('http://localhost:3000/user-places/' + place.id)
      .pipe(
        tap(
          response => {this.userPlacesSignal.set(response.userPlaces)}
        ),
        catchError((error) => {
          console.log('PlacesService --> Failed to remove selected place. Please try again later.');
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
          console.log('Error from the places.service in the host app -->', errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      )
  };
}
