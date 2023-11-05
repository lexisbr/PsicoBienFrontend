import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginInterface } from 'src/app/interface/login.interface';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./css/login.component.css']
})
export class LoginComponent implements OnInit {
  loginError:string = "";
  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  constructor(
    private formBuilder:FormBuilder,
    private usuarios: UsuarioService,
    private router: Router,
    private loginServices: LoginService
    ) { }

  ngOnInit(): void {

  }
  get email(){
    return this.loginForm.controls.email;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      console.log("Llamar al servicio de login");
      this.loginServices.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData)=>{
          console.log(userData);
        },
        error: (err) =>{
          console.error(err);
          this.loginError = err;
        },
        complete:()=>{
          this.router.navigateByUrl('/profile');
          this.loginForm.reset();
          console.info("Login completo")
        }
      })

    }else{
      alert("Error al ingresar los datos")
    }
  }

  onLogin(form: LoginInterface | any) {
    console.log(form)
    this.usuarios.login(form).subscribe(
      data => {
        console.log("Respuesta del servidor:", data);
                // // Verifica si la respuesta contiene la propiedad 'id'
                // if (data && data.dni) {
                //   const userId = data.dni;
                //   console.log("Se envio el DNI:", data.dni);
                //   // Redirige al usuario a la página de perfil con el 'id' de usuario
                //   this.router.navigate([`/profile`]);
                // } else {
                //   console.log("No se pudo obtener el 'id' del usuario de la respuesta");
                // }
      },
      error => {
        console.log(error)
        if (error.status == 404) {
          console.log("El usuario no fue encontrado")
        }
      })
  }


}
