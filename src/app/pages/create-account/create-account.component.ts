import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { Pais } from 'src/app/interface/pais.interface';
import { Estado } from 'src/app/interface/estado.interface';
import { Ciudad } from 'src/app/interface/ciudad.interface';
import { TipoUsuario } from 'src/app/enum/tipos-usuario.enum';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./css/create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  paises: Pais[] = [];
  estados: Estado[] = [];
  ciudades: Ciudad[] = [];

  tab: number = 1;

  createAccountForm = new FormGroup({
    dni: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    paswordVal: new FormControl('', Validators.required),
    idPais: new FormControl('', Validators.required),
    idEstado: new FormControl('', Validators.required),
    idCiudad: new FormControl('', Validators.required),
  });
  constructor(
    private usuarios: UsuarioService,
    private ubicacionesService: UbicacionesService
  ) {}

  ngOnInit(): void {
    this.obtenerPaises();
  }

  obtenerPaises() {
    this.ubicacionesService.obtenerPaises().subscribe((data) => {
      this.paises = data;
      console.log(data);
    });
  }

  obtenerEstados() {
    const idPais = this.createAccountForm.value.idPais;
    if (idPais !== null && idPais !== undefined) {
      this.ubicacionesService.obtenerEstados(idPais).subscribe((data) => {
        this.estados = data;
        console.log(data);
      });
    }
  }

  obtenerCiudades() {
    const idEstado = this.createAccountForm.value.idEstado;
    if (idEstado !== null && idEstado !== undefined) {
      this.ubicacionesService.obtenerCiudades(idEstado).subscribe((data) => {
        this.ciudades = data;
        console.log(data);
      });
    }
  }

  nextTab() {
    if(this.checkForNullUndefinedValues(this.createAccountForm)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, llena todos los campos',
      });
      return;
    }
    this.tab = this.tab + 1;
  }

  prevTab() {
    this.tab = this.tab - 1;
  }

  onCreate(tipoUsuario: TipoUsuario) {
    console.log(this.createAccountForm.value);
    const formData = this.createAccountForm.value;
    const userData: UsuariosInterface = {
      dni: formData.dni,
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      fechaNacimiento: formData.fechaNacimiento,
      genero: formData.genero,
      telefono: formData.telefono,
      password: formData.password,
      idCiudad: Number(formData.idCiudad),
      idTipoUsuario: tipoUsuario,
    };

    this.usuarios.crearUsuario(userData).subscribe((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado con exito',
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(data);
    });
  }

  checkForNullUndefinedValues(formGroup: FormGroup): boolean {
    let hasNullUndefinedValues = false;

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key).value;
      if (control == "" ||control === null || control === undefined) {
        hasNullUndefinedValues = true;
      }
    });

    return hasNullUndefinedValues;
  }
}
