import { Component } from '@angular/core';
import { Profesional } from 'src/app/interface/profecional';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./css/home.component.css']
})
export class HomeComponent {

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
