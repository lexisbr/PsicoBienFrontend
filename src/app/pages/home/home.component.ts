import { Component } from '@angular/core';
import { Profesional } from 'src/app/interface/profecional';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./css/home.component.css']
})
export class HomeComponent {

  userLoginOn: boolean=false;
  userData?: UsuariosInterface[];
  constructor(private usuariosServices:UsuarioService) { }

  ngOnInit() {
    this.fillCard();
  }

  fillCard(){
    console.log("Llamar a la peticion llegar")
    this.usuariosServices.obtenerUsuarios().subscribe({
      next:(usersData)=>{
        console.log(usersData);
        this.userData= usersData;
      },
      error:(err)=>{
        console.error(err);
        
      },
      complete:()=>{
        console.info("Request Complet")
      }
    })
  }
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
