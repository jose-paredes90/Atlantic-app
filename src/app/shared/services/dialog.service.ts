import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';

@Injectable()
export class DialogService {
  constructor(private readonly dialog: MatDialog) {}

  confirmationModal(
    description: string,
    okText: string = 'Aceptar',
    cancelText: string = 'Cancelar',
    width: string = '500px'
  ) {
    return this.dialog.open(ConfirmationComponent, {
      width,
      disableClose: true,
      data: {
        description,
        okText,
        cancelText,
      },
    });
  }
}
