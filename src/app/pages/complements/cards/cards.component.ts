import { Component, Input } from '@angular/core';
import { Profesional } from 'src/app/interface/profecional';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./css/cards.component.css']
})
export class CardsComponent {

  @Input() userData: UsuariosInterface;

  profesional:Profesional = {
    nombres: 'Daemon',
    apellidos: 'Targaryen',
    cedula: '15264859-4',
    colegiado: '15487521',
    idiomas: 'Valirio',
    nacionalidad: 'Westeros',
    foto:'https://pbs.twimg.com/media/FwDIp7jWcAc6mBc?format=jpg&name=900x900',
    bandera: 'https://www.therichest.com/wp-content/uploads/2017/01/House-Targaryen-Flag.jpg'
  }
}
