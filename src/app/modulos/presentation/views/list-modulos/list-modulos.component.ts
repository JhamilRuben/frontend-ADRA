import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { Modulo } from 'src/app/modulos/modulo';
import { ModuloService } from 'src/app/modulos/modulo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'adra-list-modulos',
  templateUrl: './list-modulos.component.html',
  styleUrls: ['./list-modulos.component.css']
})
export class ListModulosComponent implements OnInit {
  filas: Modulo[]=[];
  titulos: string[] = ["ID","Nombre"];
  constructor(private moduloService: ModuloService, private router:Router) { }
  modulo =new Modulo();
  ngOnInit(): void {
    this.moduloService.getModulo().subscribe(data =>{
    this.filas= data;
    });
  }
  add(){
    this.moduloService.create(this.modulo);
    swal.fire('Error Login', 'Usuario o clave Incorrecta', 'error');
 }

}