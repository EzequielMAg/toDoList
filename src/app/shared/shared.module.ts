import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from './components/error404/error404.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    RouterModule, //Para usar el routerLink y rediderccionar a una pagina cuando se haga clic en un link del navbar..

  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    Error404Component
  ]
})
export class SharedModule { }
