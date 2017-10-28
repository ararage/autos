import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params} from '@angular/router';
import { AutosService } from '../services/autos.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Auto } from '../models/auto';
//Componente Modal
import { ConfirmComponent } from '../confirm/confirm.component';
//Servicio de Dialogos
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-create-auto',
  templateUrl: './create-auto.component.html',
  styleUrls: ['./create-auto.component.css'],
  providers: [AutosService]
})
export class CreateAutoComponent implements OnInit {
  //Titulo a mostrar
  public titulo:string
  //Objeto auto a registrar 
  public auto:any
  //Formulario de auto
  public formAuto: FormGroup;
  //Mensaje de error
  public errorMessage;
  //Objeto que mostrará el titulo
  public autoTitle = {
    marca:'',
    modelo:'',
    anio:'',
    version:''
  }
  constructor(
    private autosService:AutosService,
    private dialogService:DialogService,
    private route:ActivatedRoute,
    private router:Router,
    public formBuilder: FormBuilder
  ) {
   
    this.formAuto = formBuilder.group({
      marca:[null,
            Validators.compose(
            [ Validators.maxLength(15),
              Validators.pattern('[a-zA-Z0-9 \-_.áéóíúÁÉÍÓÚäöüßÄËÏÖÜñÑ]*'), 
              Validators.required])],
      modelo:[null,
            Validators.compose(
            [ Validators.maxLength(10),
              Validators.pattern('[a-zA-Z0-9 \-_.áéóíúÁÉÍÓÚäöüßÄËÏÖÜñÑ]*'), 
              Validators.required])],
      anio:[null,
            Validators.compose(
            [ Validators.maxLength(4),
              Validators.pattern('[0-9]*'), 
              Validators.required])],
      version:[null,
            Validators.compose(
            [ Validators.maxLength(10),
              Validators.pattern('[a-zA-Z0-9 \-_.áéóíúÁÉÍÓÚäöüßÄËÏÖÜñÑ]*'),
              Validators.required])]
    })
  }

  onSubmit(){
    this.auto = new Auto(
      this.formAuto.value.marca,
      this.formAuto.value.modelo,
      this.formAuto.value.anio,
      this.formAuto.value.version
    )
    
    this.autosService.postAuto(this.auto)
    .subscribe(data=>{
      if(!data){
        this.showConfirm('Ocurrio un problema',
        'No se pudo realizar el registro',
        'noError')
      }else{
        this.showConfirm(
          'Auto registrado satisfactoriamente', 
          data.marca+' '+data.modelo+' '+data.anio+' '+data.version,
          'noError');
      }
    },
    error=>{
      this.errorMessage = <any>error;
      if(this.errorMessage != null){
        this.showConfirm('Ocurrio un problema',
        this.errorMessage,'error')
      }
    })
  }
    

  reset(){
    this.formAuto.reset();
  }

  showConfirm(title:string,message:string,kind:string) {
    let disposable = 
    this.dialogService.
    addDialog(ConfirmComponent,{title:title,message:message})
    .subscribe((isConfirmed)=>{
      //Ok re dirijimos a la pantalla principal
      if(kind == 'noError'){
        if(isConfirmed) {
          this.router.navigate(['/'])
        }
      }
    });
    //Se cerrará el dialogo en 10 segundos si no se toma una acción
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);
  }

  ngOnInit() {
  }

}
