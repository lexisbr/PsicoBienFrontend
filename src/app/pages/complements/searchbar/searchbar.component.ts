import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./css/searchbar.component.css']
})
export class SearchbarComponent {

  @Input() placeholder: string = 'Searchbar';

}
