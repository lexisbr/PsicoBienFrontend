import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./css/header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoginOn: boolean=false;
  constructor(private usuariosServices:UsuarioService) { }

  ngOnInit() {

  }

}
