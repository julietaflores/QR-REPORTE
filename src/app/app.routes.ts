import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { InicioComponent } from './page/inicio/inicio.component';
export const routes: Routes = [
      {
        path: '', title: 'QR REPORTE', component: LoginComponent,
      },
      {
        path: 'inicio',  title: 'QR REPORTE', component: InicioComponent,
      }
];
