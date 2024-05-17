import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { EHeaderComponent}  from '../e-header/e-header.component';
import { EFooterComponent}  from '../e-footer/e-footer.component';
import { ESidebarComponent} from '../e-sidebar/e-sidebar.component';
import { ApiserService} from "../../services/apiser.service";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {NgxPaginationModule} from 'ngx-pagination';
 import { FormsModule } from '@angular/forms';
 import * as XLSX from "xlsx";
 //import * as jsPDF from 'jspdf';
 import jsPDF from 'jspdf';
 import html2canvas from 'html2canvas'; 
 import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ FormsModule, RouterOutlet, RouterLink, EFooterComponent, EHeaderComponent, ESidebarComponent,NgxSpinnerModule,CommonModule,NgxSkeletonLoaderModule,NgxPaginationModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent  {
  page: any = 1;
  list: any[] = [];
  list_11: any[] = [];

  nom_servicio:any ='';
  repos:any[] = [];
  repos_o:any[] = [];
  repos_oo:any[] = [];
  Usuario:any='';
  startTime: any = '';
  endTime: any = '';
  startTime_aux: any = '';
  endTime_aux: any = '';
  amount_1: any='';
  currency_1: any='';
  branchOffice_1 :any='';
  documento_1:any='';
  teller_1:any='';
  phoneNumber_1:any='';
  rows:any = [];
  sdff:any='';

  tabla_autt:  tabla_aut = new tabla_aut();

  constructor(
    private api: ApiserService,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    private router: Router
  ) {

 if(localStorage.getItem('loggedUser')){
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var output = d.getFullYear() + '-' +
      (month<10 ? '0' : '') + month + '-' +
      (day<10 ? '0' : '') + day;

      this.startTime=output;
      this.endTime=output;
 }else{
  this.router.navigateByUrl('/');
 }

   



   
  }



  exportAsExcel()
  {
   
    if(this.list_11.length>0){
      console.log('cdcd jli '+this.list_11);
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(this.list_11);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'ReporteQRExcel.xlsx');
    }else{
      this.toastr.error('No hay datos.','Información');
    }
   

  }


  generatepdf(){

    if(this.rows.length>0){
      const elel:any=document.getElementById('tabla');
      const pdfvalue = this.list.toString();
      html2canvas(elel,{scale:2}).then((canvas)=>{
        const pdf= new jsPDF();
        autoTable(pdf, {
          head: [['Documento', 'Usuario Ejecutivo de Venta',
          'Ejecutivo de Venta', 'Nro Telefono', 'Sucursal',
          'Fecha Registro QR','Fecha Expiración QR','Monto de QR','Moneda de Qr','Detalle de Qr','Id Qr']],
          body:this.rows,
        });
        pdf.save('ReporteQR_PDF.pdf');
      });
  
    }else{
      this.toastr.error('No hay datos.','Información');
    }


  }





  getAll_info() {
    this.spinner.show();
    this.list = [];
    this.list_11= [];

    this.startTime_aux= this.startTime+'%2000:00:00';
    this.endTime_aux= this.endTime+'%2023:59:59';
    
    this.nom_servicio= 'lista_QR_generado_info&usuario='+this.Usuario+'&fecha_inicio='+this.startTime_aux+'&fecha_fin='+this.endTime_aux;
    this.api.getDataParament(this.nom_servicio).then((data: any) => {
      this.list= (data);
      if(this.list.length>0){
     
 
        this.list.forEach((info: any) => {
      
        this.repos=(info.Datos_ingreso);

        if(this.repos==null){
              this.amount_1 ='';
              this.currency_1= '';
              this.branchOffice_1 = '';
              this.documento_1= '';
              this.teller_1='';
              this.phoneNumber_1='';
              info.amount=this.amount_1;
              info.currency=this.currency_1;
              info.branchOffice= this.branchOffice_1;
              info.documento=this.documento_1;
              info.teller=this.teller_1;
              info.phoneNumber=this.phoneNumber_1;
              info.ExpirationDate_Qr='';
        }else{
          if(this.repos.length>0){
          
            this.repos_oo= JSON.parse(this.repos.toString());
            this.repos_oo.forEach((infoo: any) => {
            this.amount_1 =infoo.amount;
            this.currency_1= infoo.currency;
            this.branchOffice_1 = infoo.branchOffice;
            this.documento_1= infoo.documento;
            this.teller_1=infoo.teller;
            this.phoneNumber_1=infoo.phoneNumber;
            info.amount=this.amount_1;
            info.currency=this.currency_1;
            info.branchOffice= this.branchOffice_1;
            info.documento=this.documento_1;
            info.teller=this.teller_1;
            info.phoneNumber=this.phoneNumber_1;
            });
           }
        }

        this.tabla_autt.Documento=info.documento;
        this.tabla_autt.Usuario_Ejecutivo_de_Venta=info.User;
        this.tabla_autt.Ejecutivo_de_Venta=info.teller;
        this.tabla_autt.Nro_Telefono=info.phoneNumber;
        this.tabla_autt.Sucursal=info.branchOffice;
        this.tabla_autt.Fecha_Registro_QR=info.FechaRegistro;
        this.tabla_autt.Fecha_Expiración_QR=info.ExpirationDate_Qr;
        this.tabla_autt.Monto_de_QR=info.amount;
        this.tabla_autt.Moneda_de_Qr=info.currency;
        this.tabla_autt.Detalle_de_Qr=info.Detalle;
        this.tabla_autt.Id_Qr=info.Id_Qr;
      
        this.list_11.push(this.tabla_autt);
        this.tabla_autt= new tabla_aut();
      

       this.sdff= [info.documento, info.User, info.teller, info.phoneNumber, info.branchOffice,
       info.FechaRegistro,info.ExpirationDate_Qr,info.amount,info.currency,info.Detalle,info.Id_Qr];

       this.rows.push(this.sdff);

          

            });

            this.spinner.hide();
      }else{
        this.spinner.hide();
        this.toastr.error('No hay datos.','Información');
       
      }
   
    });

  }

}


export class tabla_aut  { 
  Documento: string;
  Usuario_Ejecutivo_de_Venta: string;
  Ejecutivo_de_Venta:String;
  Nro_Telefono: String;
  Sucursal:String;
  Fecha_Registro_QR:String;
  Fecha_Expiración_QR:String;
  Monto_de_QR:String;
  Moneda_de_Qr:String;
  Detalle_de_Qr:String;
  Id_Qr:String;
    constructor() {
      this.Documento = ""; 
      this.Usuario_Ejecutivo_de_Venta= "";
      this.Ejecutivo_de_Venta="";
      this.Nro_Telefono="";
      this.Sucursal="";
      this.Fecha_Registro_QR="";
      this.Fecha_Expiración_QR="";
      this.Monto_de_QR="";
      this.Moneda_de_Qr="";
      this.Detalle_de_Qr="";
      this.Id_Qr="";
    }
}
  


