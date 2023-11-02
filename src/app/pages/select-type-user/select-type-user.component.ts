import { Component, EventEmitter, Output } from '@angular/core';
import { TipoUsuario } from '../../enum/tipos-usuario.enum';

@Component({
  selector: 'app-select-type-user',
  templateUrl: './select-type-user.component.html',
  styleUrls: ['./css/select-type-user.component.css']
})
export class SelectTypeUserComponent {

  @Output() onSelectTipoUsuario = new EventEmitter<TipoUsuario>();

 tipoUsuario = TipoUsuario;

  enviarTipoUsuario(idTipoUsuario: TipoUsuario){
    this.onSelectTipoUsuario.emit(idTipoUsuario);
    console.log(this.onSelectTipoUsuario.emit(idTipoUsuario))
  } 
}
