import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { TareasCompletadasComponent } from './components/tareas-completadas/tareas-completadas.component';
import { TareasPendientesComponent } from './components/tareas-pendientes/tareas-pendientes.component';
import { TareasProgresoComponent } from './components/tareas-progreso/tareas-progreso.component';
import { TareasUsuComponent } from './components/tareas-usu/tareas-usu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,BodyComponent,ListaTareasComponent,FormularioComponent,TareasCompletadasComponent,TareasPendientesComponent,TareasProgresoComponent,TareasUsuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tareaAngular';
}
