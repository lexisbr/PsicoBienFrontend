import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LoginInterface } from 'src/app/interface/login.interface';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { TipoUsuario } from 'src/app/enum/tipos-usuario.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./css/login.component.css'],
})
export class LoginComponent implements OnInit {
  loginError: string = '';
  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  userType: TipoUsuario;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginServices: LoginService
  ) {}

  ngOnInit(): void {}
  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.loginServices.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
          this.userType = userData.idTipoUsuario;
          sessionStorage.setItem('usuario', userData.dni);
        },
        error: (err) => {
          console.error(err);
          this.loginError = err;
        },
        complete: () => {
          if (this.userType == TipoUsuario.ADMINISTRADOR) {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/profile');
          }
          this.loginForm.reset();
        },
      });
    } else {
      alert('Error al ingresar los datos');
    }
  }
}
