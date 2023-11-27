import { Component } from '@angular/core';
import { ClientesTop } from 'src/app/interface/usuarios.interface';
import { ProfesionalesService } from 'src/app/services/profesionales.service';

@Component({
  selector: 'app-top-clientes',
  templateUrl: './top-clientes.component.html',
  styleUrls: ['./css/top-clientes.component.css']
})
export class TopClientesComponent {
  clientesTop: ClientesTop[];
  constructor(private profesionalesServices: ProfesionalesService) { }
  ngOnInit() {
    this.obtenerClientesTopCitas();
  }

  obtenerClientesTopCitas(){


    this.profesionalesServices.obtenerClientesTop(2).subscribe({
      next: (data) => {
      
        this.clientesTop = data;
      },
    })

  }
  }

