import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-modal',
  templateUrl: './img-modal.component.html',
  styleUrls: ['./img-modal.component.css'],
})
export class ImgModalComponent {
  @Input() isOpen: boolean = false;
  @Input() imageUrl: string = '';

  closeModal() {
    this.isOpen = false;
  }
}
