import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./css/create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  createAccountForm = new FormGroup({
    nombres : new FormControl('',Validators.required),
    apellidos : new FormControl('',Validators.required),
    correo : new FormControl('',Validators.required),
    correoValidacion : new FormControl('',Validators.required),
    dni : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    paswordVal : new FormControl('',Validators.required)
  })
  constructor( private usuarios:UsuarioService) { }

  ngOnInit(): void{

  }

  onCreate(form: UsuariosInterface | any){
    this.usuarios.crearUsuario(form).subscribe(data =>{
      console.log(form)
    })
  }
}
