import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { ActivatedRoute } from '@angular/router';
import { Portada } from 'src/app/interface/portada';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/auth/login.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./css/profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() usuario: UsuariosInterface;
  private fileTmp:any;
  userLoginOn:boolean=false;
  userData?: UsuariosInterface;
  constructor(private usuarios: UsuarioService, private route: ActivatedRoute, private loginService:LoginService) { }

  getFile($event:any): void{
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }

  }
  ngOnDestroy():void{
    this.loginService.currentUserLoginOn.unsubscribe();
    this.loginService.currentUserData.unsubscribe();
  }
  ngOnInit() {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }
      }
    );
    this.loginService.currentUserData.subscribe(
      {
        next:(userData)=>{
          console.log("Profile",userData)
          this.userData= userData;
        }
      }
    )
    // this.usuarios.obtenerUsuario(10000001).subscribe(
    //   data => {
    //     console.log("Respuesta del servidorProfile:",data);
    //   },
    //   error => {
    //     console.log(error)
    //     if (error.status == 404) {
    //       console.log("El usuario no fue encontrado")
    //     }
    //   })
    //   console.log("prueba",this.usuario)
  }
  portada:Portada = {
    fondoPortada: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'
  }

}
