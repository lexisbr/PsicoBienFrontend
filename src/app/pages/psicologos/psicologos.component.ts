import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-psicologos',
  templateUrl: './psicologos.component.html',
  styleUrls: ['./css/psicologos.component.css']
})
export class PsicologosComponent {
  userLoginOn: boolean = false;
  userData?:UsuariosInterface ;
  userDatas?: UsuariosInterface[];


  constructor(
    private usuarioServices: UsuarioService,
    private loginService:LoginService
    ){}
  ngOnInit(){



    
    this.fillCard();
  }

  fillCard(){ 
    console.log("LLamar a la peticion llenar");
    this.usuarioServices.obtenerUsuarios().subscribe({
      next:(userData)=>{
        console.log(userData);
        this.userDatas = userData;
      },
      error:(err)=>{
        console.error(err);
      },
      complete:()=>{
        console.info("Request Complet");
      }
    })
  }

}
