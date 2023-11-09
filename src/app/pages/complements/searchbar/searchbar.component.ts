import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./css/searchbar.component.css']
})
export class SearchbarComponent {

  @Input() placeholder: string = 'Searchbar';
  value: string = "";

}
