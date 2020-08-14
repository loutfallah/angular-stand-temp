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
import { AddImagesComponent } from './pages/add-images/add-images.component';
import { AddVideosComponent } from './pages/add-videos/add-videos.component';
import { AddDocumentComponent } from './pages/add-document/add-document.component';
import { AddReseauxSociauxComponent } from './pages/add-reseaux-sociaux/add-reseaux-sociaux.component';
import { AddLiensExternesComponent } from './pages/add-liens-externes/add-liens-externes.component';
import { StaticStandComponent } from './pages/static-stand/static-stand.component';


const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'login', component: AuthentificationComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'add-stand', component: AddStandComponent, canActivate:[AuthGuard]},
  { path: 'stands', component: StandsComponent, canActivate:[AuthGuard]},
  { path: 'stand/:id', component: AfficherStandsComponent, canActivate:[AuthGuard]},
  { path: 'complete-stand/:id', component: CompleteStandBodyComponent, canActivate:[AuthGuard]},
  { path: 'img/:id', component: AddImagesComponent, canActivate:[AuthGuard]},
  { path: 'video/:id', component: AddVideosComponent, canActivate:[AuthGuard]},
  { path: 'document/:id', component: AddDocumentComponent, canActivate:[AuthGuard]},
  { path: 'sociaux/:id', component: AddReseauxSociauxComponent, canActivate:[AuthGuard]},
  { path: 'liens/:id', component: AddLiensExternesComponent, canActivate:[AuthGuard]},
  { path: 'static/:id', component: StaticStandComponent, canActivate:[AuthGuard]}



 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
