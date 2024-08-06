import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TareasService } from '../../../app/servicios/tareas.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../app/material/material.module';
import { Usuario } from '../../modelos/usuario';




@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './formulario.component.html',
  styles: ``
})
export class FormularioComponent implements OnInit {
  public frm!:FormGroup
  private fb = inject(FormBuilder);
  private serv_client = inject(TareasService);
  private _snackBar = inject(MatSnackBar);
  private _router = inject(Router);
  private _activedRouter = inject(ActivatedRoute); // extraer los parámetros de la url
  private idTarea!:string;
  public h1!:string;
  public usuarios!: Array<Usuario>;

  ngOnInit(): void { 
    this.mostrarUsuarios();
    
    // se ejecuta al cargar el componente
    //establecer las validaciones al formulario
    this.frm = this.fb.group({
      id: new FormControl({value:"",disabled:true}),
      titulo:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      fecha:['',[Validators.required]],
      idusu:['',[Validators.required]],
      estado:['',[Validators.required]],
      importancia:['',[Validators.required]]
    })

    

    //extraer los parámetros de la url
    this._activedRouter.params.subscribe(
      params=>{
        this.idTarea = params['id']
        if (this.idTarea) {
          this.cargarTarea();
          this.h1 = "Actualizar Tarea"
        }else{
          this.h1 = "Añadir Tarea"
        }
      }
    )



  }

  mostrarUsuarios():void{
    this.serv_client.getUsuarios().subscribe(
      res=>{
        //cargar los datos de la tabla
        this.usuarios = res
      }
    )
   }


  /**
   * Getter
   */
  get titulo(){
    return this.frm.get("titulo") as FormControl
  }

  get descripcion(){
    return this.frm.get("descripcion") as FormControl
  }

  get fecha(){
    return this.frm.get("fecha") as FormControl
  }

  get idusu(){
    return this.frm.get("idusu") as FormControl
  }

  get estado(){
    return this.frm.get("estado") as FormControl
  }

  get importancia(){
    return this.frm.get("importancia") as FormControl
  }

  grabarDatos():void{
    if (this.frm.controls['id'].value =="") {
      this.anadirTarea();
    }else{
      this.actualizarTarea();
    }
  }

  mensaje(mensaje:string):void{
    this._snackBar.open(mensaje,"Cerrar",{
      duration:1500,
      verticalPosition:"top"
    })
  }

  anadirTarea():void{
      this.serv_client.addTarea(this.frm.value).subscribe(
        res=>{
          if (res) {
            this.mensaje("El Tarea ha sido grabado");
            this.frm.reset(); // limpiar el formulario
            this._router.navigate(['/tareas']); // Cargar el componente crud
          }else{
            this.mensaje("La Tarea no se pudo grabar")
          }
        }
      )
  }

  actualizarTarea():void{
    const id:number = this.frm.controls['id'].value;
    this.serv_client.updateTarea(this.frm.value, id).subscribe(
      res=>{
        if (res) {
          this.mensaje("El Tarea ha sido actualizado");
          this.frm.reset(); // limpiar el formulario
          this._router.navigate(['/tareas']); // Cargar el componente crud
        }else{
          this.mensaje("El Tarea no se pudo actualizar")
        }
      }
    )
  }

  cargarTarea():void{
    this.serv_client.getTarea(this.idTarea).subscribe(
      res=>{
        if (res) {
          console.log(res);
          
          //cargar los datos al formulario
        this.frm.controls['id'].setValue(res._id);
        this.frm.controls['titulo'].setValue(res.titulo);
        this.frm.controls['descripcion'].setValue(res.descripcion);
        this.frm.controls['fecha'].setValue(res.fecha);
        this.frm.controls['idusu'].setValue(res.idusu);
        this.frm.controls['estado'].setValue(res.estado);
        this.frm.controls['importancia'].setValue(res.importancia);
        }else{
          this.mensaje("La tarea no existe");
          this._router.navigate(['/tareas']);
        }
        
      }
    )
  }

}
