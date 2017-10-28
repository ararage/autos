import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';

/*Formularios*/
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

/*Componentes*/ 
import { AppComponent } from './app.component';
import { AutosComponent } from './autos/autos.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ReadAutoComponent } from './read-auto/read-auto.component';
import { CreateAutoComponent } from './create-auto/create-auto.component';

/*Servicios*/
import { AutosService } from './services/autos.service'

/*Modals*/
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

/*HTTP y JSONP*/
import { HttpModule,JsonpModule } from '@angular/http';

/*Rutas*/
import { RouteRoutingModule } from './route/route-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    AutosComponent,
    ConfirmComponent,
    ReadAutoComponent,
    CreateAutoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    BootstrapModalModule,
    RouteRoutingModule
  ],
  entryComponents: [
    ConfirmComponent
  ],
  providers: [AutosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
