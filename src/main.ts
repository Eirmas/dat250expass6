import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withRouterConfig } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'no' },
    provideAnimations(),
    provideHttpClient(withJsonpSupport()),
    provideRouter(
      routes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
    importProvidersFrom(MatNativeDateModule, MatDialogModule, MatSnackBarModule),
  ],
}).catch((err) => console.error(err));
