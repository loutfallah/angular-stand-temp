import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthBodyComponent } from './include/auth-body/auth-body.component';
import { RegisterBodyComponent } from './include/register-body/register-body.component';
import { NavbarComponent } from './include/navbar/navbar.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './include/sidebar/sidebar.component';
import { AddStandComponent } from './pages/add-stand/add-stand.component';
import { AddStandBodyComponent } from './include/add-stand-body/add-stand-body.component';
import { CompleteStandBodyComponent } from './pages/complete-stand-body/complete-stand-body.component';
import { StandsBodyComponent } from './include/stands-body/stands-body.component';
import { StandsComponent } from './pages/stands/stands.component';
import { AfficherStandsComponent } from './pages/afficher-stands/afficher-stands.component';
import { AfficherStandBodyComponent } from './include/afficher-stand-body/afficher-stand-body.component';
import { SendEmailComponent } from './include/send-email/send-email.component';
import { DocumentBodyComponent } from './include/document-body/document-body.component';
import { VideoBodyComponent } from './include/video-body/video-body.component';
import { GalerieBodyComponent } from './include/galerie-body/galerie-body.component';
import { TemoignageBodyComponent } from './include/temoignage-body/temoignage-body.component';
import { FaqBodyComponent } from './include/faq-body/faq-body.component';
import { EntrepriseBodyComponent } from './include/entreprise-body/entreprise-body.component';
import { ReseauxSociauxBodyComponent } from './include/reseaux-sociaux-body/reseaux-sociaux-body.component';
import { LiensExternesBodyComponent } from './include/liens-externes-body/liens-externes-body.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [ 
    AppComponent,
    AcceuilComponent,
    AuthentificationComponent,
    AuthBodyComponent,
    RegisterBodyComponent,
    NavbarComponent,
    HomeComponent,
    SidebarComponent,
    AddStandComponent,
    AddStandBodyComponent,
    CompleteStandBodyComponent,
    StandsBodyComponent,
    StandsComponent,
    AfficherStandsComponent,
    AfficherStandBodyComponent,
    SendEmailComponent,
    DocumentBodyComponent,
    VideoBodyComponent,
    GalerieBodyComponent,
    TemoignageBodyComponent,
    FaqBodyComponent,
    EntrepriseBodyComponent,
    ReseauxSociauxBodyComponent,
    LiensExternesBodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:  TokenInterceptorService,
    multi: true
  }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
