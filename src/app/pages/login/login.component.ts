import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginInterface } from 'src/app/interface/login.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./css/login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm =  new FormGroup({
    correo : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })
  constructor ( private usuarios:UsuarioService){}
  ngOnInit(): void {
    
  }
  onLogin(form: LoginInterface | any){
    // this.usuarios.loginUsuario(form).subscribe(data =>{
      console.log(form)
    // })
  }

}
