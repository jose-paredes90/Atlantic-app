import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-success',
  templateUrl: './message-success.component.html',
  styleUrl: './message-success.component.scss'
})
export class MessageSuccessComponent {
  constructor(private snackBar: MatSnackBar) {}

  mostrarSnackbar() {
    this.snackBar.open('¡Hola! Este es un snackbar.', 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
