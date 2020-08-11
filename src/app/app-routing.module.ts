import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { HomeComponent } from './pages/home/home.component';
import { AddStandComponent } from './pages/add-stand/add-stand.component';
import { CompleteStandBodyComponent } from './pages/complete-stand-body/complete-stand-body.component';
import { StandsComponent } from './pages/stands/stands.component';
import { AfficherStandsComponent } from './pages/afficher-stands/afficher-stands.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'login', component: AuthentificationComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'add-stand', component: AddStandComponent, canActivate:[AuthGuard]},
  { path: 'complete-stand/:id', component: CompleteStandBodyComponent, canActivate:[AuthGuard]},
  { path: 'stands', component: StandsComponent, canActivate:[AuthGuard]},
  { path: 'stand/:id', component: AfficherStandsComponent, canActivate:[AuthGuard]}



 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
