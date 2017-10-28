import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componentes
import {AutosComponent} from '../autos/autos.component';
import {ReadAutoComponent} from '../read-auto/read-auto.component';
import {CreateAutoComponent} from '../create-auto/create-auto.component';

const routes: Routes = [
  {path: '',component: AutosComponent}, //Mostrar listado
  {path: 'autos/:id/details',component:ReadAutoComponent},//Leer
  {path: 'create',component:CreateAutoComponent},
  {path: '**',component:AutosComponent} //Rutas invalidas
];

@NgModule({
  imports: [
    //Crea un modulo que contiene todas las directivas,
    //las rutas dadas, y el mismo servicio de rutas.
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
