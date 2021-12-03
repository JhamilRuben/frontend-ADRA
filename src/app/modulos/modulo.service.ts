import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { Modulo } from './modulo';
import { map, catchError} from 'rxjs/operators';
import { AuthService } from '../core/presentation/views/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  
  private urlmodulo:string ='http://localhost:8080/api/modulos'; 
  private urlpmodulo2:string = "http://localhost:8080/api/modulos";
  //https://app-uc-sur.herokuapp.com/api/posts/create
  //http://localhost:9090/api/posts/all
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }
  getModulo():Observable<Modulo[]>{
    return this.http.get<Modulo[]>(this.urlmodulo + '/all', {headers: this.agregarAuthorizationHeader()});    
  }
  create(modulo:Modulo):Observable<Modulo>{    
    return this.http.post(this.urlmodulo + '/create', modulo)
    .pipe(
      map((response: any)=> response.modulo as Modulo),
      catchError(e =>{
        if(e.status == 401){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
  getModuloId(id:number): Observable<Modulo>{
    return this.http.get<Modulo>(`${this.urlmodulo}/${id}`).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/modulos']);
        }
        return throwError(0);
      }));
  }
  update(modulo:Modulo):Observable<any>{
    return this.http.put<any>(`${this.urlmodulo}/${modulo.idmodulo}`, modulo).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);        
        }
        return throwError(e);
      })
    )
  }
  delete(id:number):Observable<Modulo>{
    return this.http.delete<Modulo>(`${this.urlmodulo}/${id}`).pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
}