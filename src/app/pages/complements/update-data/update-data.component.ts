import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { IdiomasService } from 'src/app/services/idiomas.service';
import { Idiomas, IdiomasProfesional } from 'src/app/interface/profesionales_idiomas.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProfesionalEspecialidades, ClinicasProfesional } from 'src/app/interface/profesionales_idiomas.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { Pais } from 'src/app/interface/pais.interface';
import { Estado } from 'src/app/interface/estado.interface';
import { Ciudad } from 'src/app/interface/ciudad.interface';
@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./css/update-data.component.css']
})
export class UpdateDataComponent implements OnInit {
  @Output() actualizarPerfil = new EventEmitter<boolean>();
  paises: Pais[] = [];
  estados: Estado[] = [];
  ciudades: Ciudad[] = [];

  //para actualizar fotos
  title: 'uploadFiles';
  image = "";
  imgURL = '../../../../assets/sin_foto.jpg';
  //para actualizar especialidades
  especialidadesForm = this.formBuilder.group({
    colegiadoProfesional: new FormControl('', Validators.required),
    especialidad: new FormControl('', Validators.required),
  })
  //para actualizar idiomas
  idiomasForm = this.formBuilder.group({
    idIdioma: new FormControl('', Validators.required),
    colegiadoProfesional: new FormControl('', Validators.required),

  })
  clinicaForm = this.formBuilder.group({
    zona: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    piso: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    referencias_direccion: new FormControl('', Validators.required),
    idCiudad: new FormControl('', Validators.required),
    colegiadoProfesional: new FormControl('', Validators.required),
    terminosDeAtencion: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    idPais: new FormControl('', Validators.required),
    idEstado: new FormControl('', Validators.required),
  })
  //
  userDataIdiomas: IdiomasProfesional[]
  idiomas: IdiomasProfesional[];
  userData?: UsuariosInterface;
  especialidades: ProfesionalEspecialidades[];
  clinicasProfesiona?: ClinicasProfesional[];//oberter clinicas
  constructor(
    private loginService: LoginService,
    private idiomasService: IdiomasService,
    private usuariosServices: UsuarioService,
    private formBuilder: FormBuilder,
    private ubicacionesService: UbicacionesService,
    private http: HttpClient
  ) { }
  enviarDatosAlPadre() {
    const datos = true; // Cambia esto según tus necesidadesn
    this.actualizarPerfil.emit(datos);
  }

  ngOnInit() {
    this.loginService.currentUserData.subscribe(
      {
        next: (userData) => {
          this.userData = userData;
          this.especialidadesForm.get('colegiadoProfesional').setValue(userData.colegiadoProfesional);
          this.idiomasForm.get('colegiadoProfesional').setValue(userData.colegiadoProfesional);
        }
      }
    )
    this.idiomasService.obtenerIdiomasProfesional(this.userData.dni).subscribe(
      {
        next: (idiomasData) => {
          this.userDataIdiomas = idiomasData
        }
      })
    this.usuariosServices.buscarEspecialidad(this.userData.dni).subscribe({
      next: (data) => {
        console.log(data);
        this.especialidades = data;
      },
      error: (err) => {
        console.error(err);

      },
      complete: () => {
        console.info("Request Complet")
      }
    })
    this.usuariosServices.obtenerClinicas(this.userData.colegiadoProfesional).subscribe(
      {
        next: (clinicas)=>{
          this.clinicasProfesiona = clinicas;
        }
      }
    ) 

    this.obtenerIdiomas();
    this.obtenerPaises();
  }

  obtenerPaises() {
    this.ubicacionesService.obtenerPaises().subscribe((data) => {
      this.paises = data;
      console.log(data);
    });
  }

  obtenerEstados() {

    const idPais = this.clinicaForm.value.idPais;
    if (idPais !== null && idPais !== undefined) {
      this.ubicacionesService.obtenerEstados(idPais).subscribe((data) => {
        this.estados = data;
        console.log(data);
      });
    }
  }

  obtenerCiudades() {
    const idEstado = this.clinicaForm.value.idEstado;
    if (idEstado !== null && idEstado !== undefined) {
      this.ubicacionesService.obtenerCiudades(idEstado).subscribe((data) => {
        this.ciudades = data;
        console.log(data);
      });
    }
  }



  obtenerIdiomas() {
    this.idiomasService.obtenerIdiomas().subscribe({
      next: (data) => {
        console.log(data);
        this.idiomas = data;
      }
    })
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const readear = new FileReader();
      readear.readAsDataURL(file);
      readear.onload = (event: any) => {
        this.imgURL = event.target.result;
      }
      this.image = file;
      console.log(this.image)
    }
  }
  selectIdioma(event) {
    this.idiomasForm.get('idIdioma').setValue(event.target.value);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('dni', this.userData.dni);
    this.http.post<any>('http://localhost:3000/profesionales/portada', formData).subscribe(
      (res) => (Swal.fire({
        icon: 'success',
        title: 'Imagen Cargada',
        text: 'La imagen se subio correctamente'
      }).then((result) => {
        if (result) {
          location.reload();
        }
      })
      ),
      (err) => (Swal.fire({
        icon: 'error',
        title: 'Opps....',
        text: 'Parece que no subio nada!!!'

      }))
    )
    console.log("Esto se subio", formData)
  }
  onSubmit2() {
    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('dni', this.userData.dni);
    this.http.post<any>('http://localhost:3000/profesionales/perfil', formData).subscribe(
      (res) => (Swal.fire({
        icon: 'success',
        title: 'Imagen Cargada',
        text: 'La imagen se subio correctamente'
      }).then((result) => {
        if (result) {
          location.reload();
        }
      })
      ),
      (err) => (Swal.fire({
        icon: 'error',
        title: 'Opps....',
        text: 'Parece que no subio nada!!!'

      }))
    )
    console.log("Esto se subio", formData)
  }
  deleteIdioma(idProfesionalIdiomas) {
    Swal.fire({
      icon: 'info',
      title: `Desea eliminar el idioma?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<any>(`http://localhost:3000/usuarios/deleteIdioma/${idProfesionalIdiomas}`).subscribe(
          (res) => (Swal.fire({
            icon: 'success',
            title: 'Idioma borrada',
            text: 'El idioma se borro correctamente'
          }).then((result) => {
            if (result) {
              location.reload();
            }
          })
          ),
          (err) => (Swal.fire({
            icon: 'error',
            title: 'Opps....',
            text: 'Parece que no subio nada!!!'
          })
          )
        )
      }
    })
  }

  agregarIdioma() {
    if (this.idiomasForm.valid) {
      console.log("Llamar al servicio de especialidades", this.idiomasForm.value);
      this.http.post<any>('http://localhost:3000/usuarios/agregarIdioma', this.idiomasForm.value).subscribe(
        (res) => (Swal.fire({
          icon: 'success',
          title: 'Idioma agregado',
          text: 'El idioma se subio correctamente'
        }).then((result) => {
          if (result) {
            location.reload();
          }
        })
        ),
        (err) => (Swal.fire({
          icon: 'error',
          title: 'Opps....',
          text: 'Parece que no subio nada!!!'
        }))
      )
    }
  }

  agregarEspecialidad() {
    if (this.especialidadesForm.valid) {
      console.log("Llamar al servicio de especialidades", this.especialidadesForm.value);
      this.http.post<any>('http://localhost:3000/usuarios/agregarEspecialidad', this.especialidadesForm.value).subscribe(
        (res) => (Swal.fire({
          icon: 'success',
          title: 'Especialidad agregada',
          text: 'La especialidad se subio correctamente'
        }).then((result) => {
          if (result) {
            location.reload();
          }
        })
        ),
        (err) => (Swal.fire({
          icon: 'error',
          title: 'Opps....',
          text: 'Parece que no subio nada!!!'
        })
        )
      )
    }
  }

  deleteEspecialidad(idProfesionalIdiomas) {
    Swal.fire({
      icon: 'info',
      title: `Desea eliminar el especialidad?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(idProfesionalIdiomas)
        this.http.delete<any>(`http://localhost:3000/usuarios/deleteEspecialidad/${idProfesionalIdiomas}`).subscribe(
          (res) => (Swal.fire({
            icon: 'success',
            title: 'Especialidad borrada',
            text: 'La especialidad se borro correctamente'
          }).then((result) => {
            if (result) {
              location.reload();
            }
          })
          ),
          (err) => (Swal.fire({
            icon: 'error',
            title: 'Opps....',
            text: 'Parece que no subio nada!!!'
          })
          )
        )
      }
    })
  }
  deleteClinica(idClinica) {
    Swal.fire({
      icon: 'info',
      title: `Desea eliminar la clinica?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(idProfesionalIdiomas)
        this.http.delete<any>(`http://localhost:3000/usuarios/deleteClinica/${idClinica}`).subscribe(
          (res) => (Swal.fire({
            icon: 'success',
            title: 'Clinica borrada',
            text: 'La clinica se borro correctamente'
          }).then((result) => {
            if (result) {
              location.reload();
            }
          })
          ),
          (err) => (Swal.fire({
            icon: 'error',
            title: 'Opps....',
            text: 'Parece que no subio nada!!!'
          })
          )
        )
      }
    })
  }
}
