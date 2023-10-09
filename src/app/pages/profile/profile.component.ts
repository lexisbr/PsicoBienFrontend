import { Component, OnInit } from '@angular/core';

import { Portada } from 'src/app/interface/portada';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./css/profile.component.css']
})
export class ProfileComponent implements OnInit {

  private fileTmp:any;
  constructor() { }

  getFile($event:any): void{
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }

  }

  ngOnInit() {
  }

  portada:Portada = {
    fondoPortada: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'
  }

}
