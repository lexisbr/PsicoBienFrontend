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
import { Router } from '@angular/router';
import { ProfesionalesService } from 'src/app/services/profesionales.service';

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
    email: new FormControl('', [Validators.required, Validators.email]),
    fechaNacimiento: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
    paswordVal: new FormControl('', Validators.required),
    idPais: new FormControl('', Validators.required),
    idEstado: new FormControl('', Validators.required),
    idCiudad: new FormControl('', Validators.required),
    numeroColegiado: new FormControl(''),
  });

  //para actualizar fotos
  title: 'uploadFiles';
  image = '';
  imgURL = '../../../../assets/sin_foto.jpg';

  get dni() {
    return this.createAccountForm.controls.dni;
  }
  get nombre() {
    return this.createAccountForm.controls.nombre;
  }
  get apellido() {
    return this.createAccountForm.controls.apellido;
  }
  get email() {
    return this.createAccountForm.controls.email;
  }
  get fechaNacimiento() {
    return this.createAccountForm.controls.fechaNacimiento;
  }
  get genero() {
    return this.createAccountForm.controls.genero;
  }
  get telefono() {
    return this.createAccountForm.controls.telefono;
  }

  get password() {
    return this.createAccountForm.controls.password;
  }
  get paswordVal() {
    return this.createAccountForm.controls.paswordVal;
  }
  get idPais() {
    return this.createAccountForm.controls.idPais;
  }
  get idEstado() {
    return this.createAccountForm.controls.idEstado;
  }
  get idCiudad() {
    return this.createAccountForm.controls.idCiudad;
  }
  get numeroColegiado() {
    return this.createAccountForm.controls.numeroColegiado;
  }
  constructor(
    private usuarios: UsuarioService,
    private ubicacionesService: UbicacionesService,
    private profesionalesService: ProfesionalesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerPaises();
  }

  obtenerPaises() {
    this.ubicacionesService.obtenerPaises().subscribe((data) => {
      this.paises = data;
    });
  }

  obtenerEstados() {
    const idPais = this.createAccountForm.value.idPais;
    if (idPais !== null && idPais !== undefined) {
      this.ubicacionesService.obtenerEstados(idPais).subscribe((data) => {
        this.estados = data;
      });
    }
  }

  obtenerCiudades() {
    const idEstado = this.createAccountForm.value.idEstado;
    if (idEstado !== null && idEstado !== undefined) {
      this.ubicacionesService.obtenerCiudades(idEstado).subscribe((data) => {
        this.ciudades = data;
      });
    }
  }

  nextTab() {
    if (this.tab == 1) {
      const password = this.createAccountForm.value.password;
      const passwordVal = this.createAccountForm.value.paswordVal;
      if (this.checkForNullUndefinedValues(this.createAccountForm)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, llena todos los campos',
        });
        return;
      } else if (password !== passwordVal) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Las contraseñas no coinciden',
        });
        return;
      }
    }
    this.tab = this.tab + 1;
  }

  prevTab() {
    this.tab = this.tab - 1;
  }

  onCreate(tipoUsuario: TipoUsuario) {
    if (tipoUsuario === TipoUsuario.PACIENTE) {
      this.sendDataToCreateUser(tipoUsuario);
    } else if (tipoUsuario === TipoUsuario.PROFESIONAL) {
      this.nextTab();
    }
  }

  sendDataToCreateUser(tipoUsuario: TipoUsuario) {
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
      colegiadoProfesional: formData.numeroColegiado,
    };

    this.usuarios.crearUsuario(userData).subscribe({
      next: (userData) => {
        console.log('userdata', userData);
        sessionStorage.setItem('usuario', userData.dni);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        if (tipoUsuario === TipoUsuario.PROFESIONAL) {
          Swal.fire({
            icon: 'success',
            title:
              'Hemos registrado tu solicitud con éxito',
            showConfirmButton: true,
          });
        } else if (tipoUsuario === TipoUsuario.PACIENTE) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado con exito',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        this.router.navigateByUrl('/profile');
      },
    });
  }

  checkForNullUndefinedValues(formGroup: FormGroup): boolean {
    let hasNullUndefinedValues = false;

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key).value;
      if (key != "numeroColegiado" && (control == '' || control === null || control === undefined)) {
        hasNullUndefinedValues = true;
      }
    });

    return hasNullUndefinedValues;
  }

  createProfesional() {
    if (this.image != '' && this.numeroColegiado) {
      const formData = new FormData();
      formData.append('file', this.image);
      formData.append('dni', this.createAccountForm.value.dni);
      formData.append('colegiado', this.numeroColegiado.value);

      this.profesionalesService.enviarSolicitudRegistro(formData).subscribe({
        next: (data) => {
          this.sendDataToCreateUser(TipoUsuario.PROFESIONAL);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, llena todos los campos',
      });
    }
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const readear = new FileReader();
      readear.readAsDataURL(file);
      readear.onload = (event: any) => {
        this.imgURL = event.target.result;
      };
      this.image = file;
    }
  }
}
