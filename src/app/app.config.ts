import { ApplicationConfig,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
     provideRouter(routes),
     provideHttpClient(), 
     provideEnvironmentNgxMask(), provideAnimationsAsync(),
     provideToastr(
       {
         closeButton: true, positionClass: 'toast-top-center',
         timeOut: 3000,preventDuplicates:false
       }
     )
     
  ]
};
