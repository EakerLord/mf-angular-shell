import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlacesService } from '../services/places.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: PlacesService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render two navigation buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.actions__button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('App de Angular 16');
    expect(buttons[1].textContent).toContain('App de Angular 19');
  });

  it('should have correct routerLinks on buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.actions__button');
    expect(buttons[0].getAttribute('ng-reflect-router-link')).toBe('/a16');
    expect(buttons[1].getAttribute('ng-reflect-router-link')).toBe('/a19');
  });
});
