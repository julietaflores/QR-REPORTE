import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, from } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiserService {
  repos:any[] = [];

  baseURL: string = "http://sap.monterrey.com.bo:56479/web_service_qr/servicio.php?nombre=";


  constructor(private http: HttpClient ) { 
    
  }

  getData(): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      console.log(' campo 1 '+this.baseURL);
      this.http.get(this.baseURL).subscribe((data) => {
        console.log(' campo 2 '+JSON.stringify(data));
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }



  getDataParament(nombre: string ): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        console.log(' campo 1 '+this.baseURL+nombre);
        this.http.get(this.baseURL+nombre).subscribe((data) => {
        //  console.log(' campo 2 '+JSON.stringify(data));
          resolve(data);
        }, error => {
          reject(error);
        });

      });
    }
  }
