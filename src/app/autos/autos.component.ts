import { Component, OnInit} from '@angular/core';
//Componente Modal
import { ConfirmComponent } from '../confirm/confirm.component';
//Servicio Autos
import { AutosService } from '../services/autos.service';
//Modelo Auto
import { Auto } from '../models/auto';  
//Servicio de Dialogos
import { DialogService } from "ng2-bootstrap-modal";
//Nos permite utilizar la configuración de Rutas
import { Router } from '@angular/router';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css'],
  providers: [AutosService]
})
export class AutosComponent implements OnInit {
  //Titulo del componente
  public titulo:string;
  //Array de autos a iterar
  public autos:Auto[];
  //Mensaje de error
  public errorMessage;
  constructor(
    private router: Router,
    private _autoService:AutosService,
    private dialogService:DialogService) {
    this.titulo = "Listado de autos"
  }
  ngOnInit() {
    this.getAutos()
  }
  getAutos(){
    this._autoService.getAutos().subscribe(
      result=>{
        if(!result){
          this.showConfirm("Ocurrio un error","No se obtuvieron los autos","error")
        }else{
          this.autos = result
          localStorage.setItem('autos',JSON.stringify(result));
        }
      },
      error=>{
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          this.showConfirm('Ocurrio un problema',
          this.errorMessage,'error')
        }
      }
    )
  }

  view(auto:any){
    this.router.navigate(['/autos',auto._id,'details'])
  }

  showConfirm(title:string,message:string,kind:string) {
    let disposable = 
    this.dialogService.
    addDialog(ConfirmComponent,{title:title,message:message})
    .subscribe((isConfirmed)=>{
      //Si hay un error al obtener los autos, y damos
      //Ok intentamos nuevamente la petición
      if(kind=='error'){
        if(isConfirmed) {
            this.getAutos()
        }
      }
    });
    //Se cerrará el dialogo en 10 segundos si no se toma una acción
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);
  }

}
