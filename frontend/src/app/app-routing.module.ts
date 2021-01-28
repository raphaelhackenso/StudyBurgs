import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FamilyComponent} from "./family/family.component";
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {DetailsComponent} from "./details/details.component";
import {AddHabsburgComponent} from "./add-habsburg/add-habsburg.component";
import {AddNotesComponent} from "./add-notes/add-notes.component";
import {DetailsUserComponent} from "./details-user/details-user.component";
import {MyStudentsComponent} from "./my-students/my-students.component";
import {AddUserComponent} from "./add-user/add-user.component";

const routes: Routes = [
  {path: '', redirectTo: 'family', pathMatch: 'full'},
  {path: 'family', component: FamilyComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'details/:pk', component: DetailsComponent, canActivate: [AuthGuard]},
  {path: 'add-habsburg', component: AddHabsburgComponent, canActivate: [AuthGuard]},
  {path: 'add-habsburg/:pk', component: AddHabsburgComponent, canActivate: [AuthGuard]},
  {path: 'add-user/:pk', component: AddUserComponent, canActivate: [AuthGuard]},
  {path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard]},
  {path: 'add-notes/:pk', component: AddNotesComponent, canActivate: [AuthGuard]},
  {path: 'add-notes', component: AddNotesComponent, canActivate: [AuthGuard]},
  {path: 'details-user', component: DetailsUserComponent, canActivate: [AuthGuard]},
  {path: 'my-students', component: MyStudentsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
