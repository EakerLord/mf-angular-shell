import { TestBed } from '@angular/core/testing';
import { PlacesService } from './places.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Place } from './place.model';

describe('PlacesService', () => {
  let service: PlacesService;
  let httpMock: HttpTestingController;

  const mockPlaces: Place[] = [
    { id: '1', title: 'Place 1', image: { src: 'place1.jpg', alt: 'Place 1' }, lat: 0, lon: 0 },
    { id: '2', title: 'Place 2', image: { src: 'place2.jpg', alt: 'Place 2' }, lat: 0, lon: 0 },
    { id: '3', title: 'Place 3', image: { src: 'place3.jpg', alt: 'Place 3' }, lat: 0, lon: 0 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlacesService]
    });

    service = TestBed.inject(PlacesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadAvailablePlaces should fetch places', (done) => {
    service.loadAvailablePlaces().subscribe(places => {
      expect(places).toEqual(mockPlaces);
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/places');
    expect(req.request.method).toBe('GET');
    req.flush({ places: mockPlaces });
  });

  it('loadUserPlaces should fetch user places and update signal', (done) => {
    service.loadUserPlaces().subscribe(places => {
      expect(places).toEqual(mockPlaces);
      expect(service.loadedUserPlaces()).toEqual(mockPlaces);
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/user-places');
    expect(req.request.method).toBe('GET');
    req.flush({ places: mockPlaces });
  });

  it('addPlaceToUserPlaces should update user places signal', (done) => {
    const place = mockPlaces[0];
    const response = { userPlaces: mockPlaces };

    service.addPlaceToUserPlaces(place).subscribe(() => {
      expect(service.loadedUserPlaces()).toEqual(mockPlaces);
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/user-places');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ placeId: place.id });
    req.flush(response);
  });

  it('removeUserPlace should update user places signal', (done) => {
    const place = mockPlaces[0];
    const response = { userPlaces: [mockPlaces[1]] };

    service.removeUserPlace(place).subscribe(() => {
      expect(service.loadedUserPlaces()).toEqual([mockPlaces[1]]);
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/user-places/' + place.id);
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
  });

  it('should emit error when fetchPlaces fails', (done) => {
    service.loadAvailablePlaces().subscribe({
      next: () => {},
      error: (err) => {
        expect(err.message).toContain('Something went wrong fetching the available places');
        done();
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/places');
    req.flush({}, { status: 500, statusText: 'Server Error' });
  });
});
