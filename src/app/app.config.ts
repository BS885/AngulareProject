import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CoursesEffects } from '../courseStore/courses.effects';
import { coursesReducer } from '../courseStore/courses.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ courses: coursesReducer }),
    provideEffects([CoursesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    
  ],
};