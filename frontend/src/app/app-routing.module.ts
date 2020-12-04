import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FamilyComponent} from "./family/family.component";
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'family', pathMatch: 'full'},
  {path: 'family', component: FamilyComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
