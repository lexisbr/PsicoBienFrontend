import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';

@Component({
  selector: 'app-psicologos',
  templateUrl: './psicologos.component.html',
  styleUrls: ['./css/psicologos.component.css']
})
export class PsicologosComponent {
  userData?: UsuariosInterface[];
  constructor(private usuarioServices: UsuarioService){}
  ngOnInit(){
    this.fillCard();
  }

  fillCard(){ 
    console.log("LLamar a la peticion llenar");
    this.usuarioServices.obtenerUsuarios().subscribe({
      next:(userData)=>{
        console.log(userData);
        this.userData = userData;
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
