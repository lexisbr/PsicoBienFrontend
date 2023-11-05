import { Component } from '@angular/core';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./css/top-five.component.css']
})
export class TopFiveComponent {
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
}
