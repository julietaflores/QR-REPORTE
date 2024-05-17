import { Component, OnInit,NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet,Router} from '@angular/router';
import { ApiserService} from "../../services/apiser.service";
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLoadingModule } from "ngx-loading";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule ,RouterOutlet, RouterLink, NgxSpinnerModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent  implements OnInit{

  ngOnInit(): void {
  }



  isSignDivVisiable: boolean  = false;
  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();
  loading: boolean = false;
  errorMessage:any = '';
  nom_servicio:any ='';
  repos:any[] = [];
  typeSelected: string='';
  constructor(
    private api: ApiserService,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    private router: Router

  ){
    this.typeSelected = 'ball-fussion';
  }



  showsuccess(){
    this.toastr.success('cdcd');
  }
  showerror(){
    this.toastr.error('Saved successfully.','Failed');
  }
  showwarning(){
    this.toastr.warning('Not matched.','Warning');
  }
  showinfo(){
    this.toastr.info('just information','Info');
  }



  onLogin(){
    //debugger;
    this.spinner.show();
    if(this.loginObj.email != null  && this.loginObj.password != null) {
        console.log('usar ' +this.loginObj.email);
        console.log('password ' +this.loginObj.password);
        this.nom_servicio= 'login_aa_web&user='+this.loginObj.email+'&pase='+this.loginObj.password;
        this.api.getDataParament(this.nom_servicio).then((data: any) => {
            this.repos= (data);
            if(this.repos.length>0){
              localStorage.setItem('loggedUser', this.loginObj.email);
              localStorage.setItem('loggedPasword',this.loginObj.password);
            
              this.spinner.hide();
              this.toastr.success('Correcto.','Éxito', {closeButton:true,positionClass:'toast-bottom-right',timeOut: 3000});
              console.log(' campo 3 '+JSON.stringify(this.repos));

              this.repos.forEach((info: any) => {
                console.log(info.nombreusuario);
                localStorage.setItem('loggedusuario',info.nombreusuario);
                console.log(localStorage.getItem('loggedusuario'));
              });
              
                  window.location.href = 'inicio';
 
            }else{
              this.spinner.hide();
              this.toastr.error('Sin acceso al Sistema.','Error');
              console.log(' campo 4 '+' sin datos');
            }
         
        });

    }
  }



}
export class SignUpModel  {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password= ""
  }
}

export class LoginModel  { 
  email: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }
}
