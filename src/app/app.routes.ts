import { Routes } from '@angular/router';
import { loadRemoteModule} from "@angular-architects/module-federation";

export const routes: Routes = [
  {
    path: 'a16',
    loadComponent: () =>
      loadRemoteModule({
        type:'module',
        remoteEntry:'http://localhost:4202/remoteEntry.js',
        exposedModule:'./AppComponent',
      }).then((m)=> m.AppComponent)
  },
  {
    path:'a19',
    loadComponent: () =>
      loadRemoteModule({
        type:'module',
        remoteEntry:'http://localhost:4201/remoteEntry.js',
        exposedModule:'./AppComponent',
      }).then((m)=> m.AppComponent)
  }
];
