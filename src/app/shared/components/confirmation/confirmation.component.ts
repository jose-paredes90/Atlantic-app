import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  public src: string = "assets/img/information.jpeg";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
