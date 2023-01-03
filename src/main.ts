import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {environment} from "./environments/environment";
import {enableProdMode, importProvidersFrom} from "@angular/core";
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableDataSource} from "@angular/material/table";
import {MatError} from "@angular/material/form-field";
import { routes } from './app/app.routes';
import {APIInterceptor} from "./app/lib/interceptors";
import {MatSnackBar} from "@angular/material/snack-bar";


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent,{
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes), HttpClientModule, BrowserAnimationsModule,MatTableDataSource,MatError),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],

})
  .catch(err => console.error(err));
