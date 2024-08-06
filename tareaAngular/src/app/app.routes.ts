import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"body",
        loadComponent:()=>import("./components/body/body.component").then(c=>c.BodyComponent)
    },
    {
        path:"tareas",
        loadComponent:()=>import("./components/lista-tareas/lista-tareas.component").then(c=>c.ListaTareasComponent)
    },
    {
        path:"formulario",
        loadComponent:()=>import("./components/formulario/formulario.component").then(c=>c.FormularioComponent)
    },
    {
        path:"formulario/:id",
        loadComponent:()=>import("./components/formulario/formulario.component").then(c=>c.FormularioComponent)
    },
    {
        path:"pendientes",
        loadComponent:()=>import("./components/tareas-pendientes/tareas-pendientes.component").then(c=>c.TareasPendientesComponent)
    },
    {
        path:"progreso",
        loadComponent:()=>import("./components/tareas-progreso/tareas-progreso.component").then(c=>c.TareasProgresoComponent)
    },
    {
        path:"completadas",
        loadComponent:()=>import("./components/tareas-completadas/tareas-completadas.component").then(c=>c.TareasCompletadasComponent)
    },
    {
        path:"tareasusu",
        loadComponent:()=>import("./components/tareas-usu/tareas-usu.component").then(c=>c.TareasUsuComponent)
    },
    {//localhost por defecto
        path:"",
        redirectTo: "/body",
        pathMatch: "full"
    },
];
