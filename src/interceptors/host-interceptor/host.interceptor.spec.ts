import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { hostInterceptor } from './host.interceptor';

describe('hostInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const apiHost = 'http://localhost:4200';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([hostInterceptor])
        ),
        provideHttpClientTesting(),
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend the API host to relative URLs', () => {
    http.get('/users').subscribe();
    const req = httpMock.expectOne(apiHost + '/users');
    expect(req.request.url).toBe(apiHost + '/users');
    req.flush({});
  });

  it('should not modify absolute URLs', () => {
    http.get('https://external.com/data').subscribe();
    const req = httpMock.expectOne('https://external.com/data');
    expect(req.request.url).toBe('https://external.com/data');
    req.flush({});
  });
});
