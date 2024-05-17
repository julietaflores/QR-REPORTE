import { CommonModule } from '@angular/common';
import { Component, OnInit,NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet,Router} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-e-header',
  standalone: true,
  imports: [FormsModule ,RouterOutlet, RouterLink,CommonModule],
  templateUrl: './e-header.component.html',
  styleUrl: './e-header.component.css'
})
export class EHeaderComponent {
  usuario_acceso:any='';
  constructor(
    private router: Router

  ){
    this.usuario_acceso=localStorage.getItem('loggedusuario');
  }


  logout() {


      localStorage.removeItem('loggedUser');
      localStorage.removeItem('loggedPasword');
      localStorage.removeItem('loggedusuario');
      this.router.navigateByUrl('/');
  }
}
