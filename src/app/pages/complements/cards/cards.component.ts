import { Component } from '@angular/core';
import { Profesional } from 'src/app/interface/profecional';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./css/cards.component.css']
})
export class CardsComponent {
  profesional:Profesional = {
    nombres: 'Maynor Alexander',
    apellidos: 'Lopez Perez',
    cedula: '15264859-4',
    colegiado: '15487521',
    idiomas: 'Español',
    nacionalidad: 'Guatemalteco',
    foto:'https://pbs.twimg.com/media/FwDIp7jWcAc6mBc?format=jpg&name=900x900',
    bandera: 'https://www.therichest.com/wp-content/uploads/2017/01/House-Targaryen-Flag.jpg'
  }
}
