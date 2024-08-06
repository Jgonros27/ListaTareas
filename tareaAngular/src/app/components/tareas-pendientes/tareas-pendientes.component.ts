import { Component, OnInit, ViewChild, inject } from '@angular/core';

import { CommonModule, NgStyle } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Router } from '@angular/router';

import { MaterialModule } from '../../../app/material/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Tarea } from '../../modelos/tarea';
import { TareasService } from '../../servicios/tareas.service';


@Component({
  selector: 'app-tareas-pendientes',
  standalone: true,
  imports: [NgStyle,MaterialModule,CommonModule],
  templateUrl: './tareas-pendientes.component.html',
  styleUrl: './tareas-pendientes.component.css'
})
export class TareasPendientesComponent {
//inyectar el servicio cliente
private serv_client = inject(TareasService);
  public displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'fecha','idusu','estado','importancia','acciones'];
  public dataSource!: MatTableDataSource<Tarea>;
  private _snackBar = inject(MatSnackBar);
   public router = inject(Router);
  //paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  ngOnInit(): void {
    this.mostrarTareas();
  }
 
  mostrarTareas():void{
   this.serv_client.getTareasEstado("pendiente").subscribe(
     res=>{
       //cargar los datos al datasource de la tabla
       this.dataSource = new MatTableDataSource(res);
       //paginacion
       this.dataSource.paginator = this.paginator;
       //ordenar
       this.dataSource.sort = this.sort;
     }
   )
  }
 
  anadir():void{
     this.router.navigate(["/formulario"]);
  }
  editarTarea(id:string):void{
   this.router.navigate([`/formulario/${id}`]);
  }
 
  eliminarTarea(tarea:Tarea):void{
   if (confirm("¿Desea eliminar esta tarea?")) {
      this.serv_client.delTarea(String(tarea._id)).subscribe(
        res=>{
          this._snackBar.open("tarea eliminada","Cerrar",{
            duration:1500,
            verticalPosition:'top',
            panelClass:["style_snackbar"]
          });
          this.mostrarTareas(); //refrescar
        }
      )
   }
  }
 
   ngAfterViewInit() {
     // this.dataSource.paginator = this.paginator;
     // this.dataSource.sort = this.sort;
   }
 
  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }

 crearEstrellas(numero:number):Array<number>{
  const estrellas = [];
  estrellas[numero -1] = numero
  return estrellas; 
 }

 color(estado:string): string {
  switch (estado) {
    case 'completada':
      return 'red';
    case 'pendiente':
      return 'green';
    case 'progreso':
      return 'blue';
    default:
      return 'red';
  }
}
}
