import { inject } from '@angular/core';
import { PlacesService } from './src/services/places.service';

// File to create a service provider on the host
export const providePlacesService = () => inject(PlacesService);

