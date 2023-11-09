import { Component } from '@angular/core';
import { Pais } from 'src/app/interface/pais.interface';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./css/home.component.css']
})
export class HomeComponent {

  userLoginOn: boolean=false;
  userData?: UsuariosInterface;
  userDatas?: UsuariosInterface[];
  pais: Pais;
  constructor(
    private usuariosServices:UsuarioService,
    private ubicasionesServices: UbicacionesService,
    private loginService: LoginService
    ) { }

  ngOnInit() {
    this.fillCard();
  }

  fillCard(){
    console.log("Llamar a la peticion llegar")
    this.usuariosServices.obtenerUsuarios().subscribe({
      next:(usersData)=>{
        console.log(usersData);
        this.userDatas= usersData;
        //const idPais = usersData.idCiudad;
      },
      error:(err)=>{
        console.error(err);
        
      },
      complete:()=>{
        console.info("Request Complet")
      }
    })
  }
}
