import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Tarea } from '../modelos/tarea';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private url="http://localhost:3000"
  //inyectar HttpClient
  private http=inject(HttpClient);

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url}/usuarios`).pipe(
      catchError(error=>{
        console.log(`Error al obtener los usuarios: ${error}`);
        return of ([]);
      })
    )
  }

  getTareasUsu(id:string):Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.url}/tareas/usuario/${id}`).pipe(
      catchError(error=>{
        console.log(`Error al obtener las tareas del usuario ${id}: ${error}`);
        return of ([]);
      })
    )
  }

  getTareas():Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.url}/tareas`).pipe(
      catchError(error=>{
        console.log(`Error al obtener las tareas: ${error}`);
        return of ([]);
      })
    )
  }

  getTareasEstado(estado:string):Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.url}/tareas/${estado}`).pipe(
      catchError(error=>{
        console.log(`Error al obtener las tareas: ${error}`);
        return of ([]);
      })
    )
  }


  delTarea(id:string):Observable<boolean>{
    return this.http.delete(`${this.url}/tarea/${id}`).pipe(
      map(()=>true),
      catchError(error=>{
        console.log(`Error al eliminar la tarea: ${error}`);
        return of (false);
      })
    )
  }

  getTarea(id:string):Observable<Tarea>{
    return this.http.get<Tarea>(`${this.url}/tarea/${id}`).pipe(
      map(res=>{
        return res;
      }),
      catchError(error=>{
        console.log(`Error al obtener la tarea: ${error}`);
        return of ({} as Tarea);
      })
    )
  }

  addTarea(tarea:Tarea):Observable<boolean>{
    return this.http.post<Tarea>(`${this.url}/tarea`,tarea).pipe(
      map(res=>{
        return true;
      }),
      catchError(error=>{
        console.log(`Error al insertar la tarea: ${error}`);
        return of (false);
      })
    )
  }

  updateTarea(tarea:Tarea, id:number):Observable<boolean>{
    return this.http.put<Tarea>(`${this.url}/tarea/${id}`,tarea).pipe(
      map(res=>{
        return true;
      }),
      catchError(error=>{
        console.log(`Error al actualizar la tarea: ${error}`);
        return of (false);
      })
    )
  }


}
