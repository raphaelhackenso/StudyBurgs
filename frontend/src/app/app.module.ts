import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DateComponent} from "./date/date.component";
import {JwtModule} from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FamilyComponent } from './family/family.component';
import {MatSortModule} from "@angular/material/sort";
import { NgxOrgChartModule } from 'ngx-org-chart';
import { DetailsComponent } from './details/details.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AddHabsburgComponent } from './add-habsburg/add-habsburg.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {HttperrorInterceptor} from "./httperror.interceptor";
import { ProgressComponent } from './progress/progress.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { MyStudentsComponent } from './my-students/my-students.component';
import * as XLSX from 'xlsx';

@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    LoginComponent,
    LogoutComponent,
    FamilyComponent,
    DetailsComponent,
    AddHabsburgComponent,
    ProgressComponent,
    DetailsUserComponent,
    AddNotesComponent,
    MyStudentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxOrgChartModule,
    MatProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:4200']
      }
    }),
    MatSortModule,
    MatGridListModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttperrorInterceptor,
      multi: true,
      deps: [MatSnackBar]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
