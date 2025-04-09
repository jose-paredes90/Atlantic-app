import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../../../../services/loan.service';
import { BookCopyService } from '../../../../services/book-copy.service';
import { SelectModel } from '../../../../shared/models/select-model';
import { BookCopyDto } from '../../../../models/book-copy.dto';
import { LoansRequestDto } from '../../../../models/load.request.dto';
import { LoansDto } from '../../../../models/loan.dto';
import { BookCopyStatusEnum } from '../../../../shared/enums/book.copy.status.enum';
import { ClientsDto } from '../../../../models/clients.dto';
import { ClientsService } from '../../../../services/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.scss',
})
export class LoanFormComponent implements OnInit {
  loanForm!: FormGroup;
  editingPrestamo: LoansDto | null = null;
  booksCopy: SelectModel[] = [];
  minDate = new Date(new Date().setHours(0, 0, 0, 0));
  clients: ClientsDto[] = [];

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private bookCopyService: BookCopyService,
    public dialogRef: MatDialogRef<LoanFormComponent>,
    private clientService: ClientsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: LoansDto
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.createForm();
    this.getBookCopy();
    this.setLoans();
  }

  createForm() {
    this.loanForm = this.fb.group({
      libroId: ['', Validators.required],
      clienteId: ['', Validators.required],
      fechaDevolucion: ['', Validators.required],
    });
  }

  getClients() {
    this.clientService.getClients().subscribe((response) => {
      this.clients = response;
    });
  }

  setLoans() {
    if (this.data) {
      this.loanForm.patchValue({
        libroId: this.data.bookCopyId,
        clienteId: this.data.clientId,
        fechaDevolucion: this.data.dueDate,
      });

      this.loanForm.controls['libroId'].disable();
      this.loanForm.controls['clienteId'].disable();
    }
  }

  getBookCopy() {
    const status = !this.data ? BookCopyStatusEnum.Available : undefined;
    this.bookCopyService.getAllBookCopies(status).subscribe((response) => {
      this.booksCopy = response.map((bookcopy: BookCopyDto) => ({
        value: bookcopy.id,
        label: bookcopy.barcode + ' - ' + bookcopy.book.title,
      }));
    });
  }

  createPrestamo() {
    if (this.loanForm.invalid) {
      return;
    }

    console.log(this.loanForm);

    const request: LoansRequestDto = {
      bookCopyId: this.loanForm.value.libroId,
      clientId: this.loanForm.value.clienteId,
      dueDate: this.loanForm.value.fechaDevolucion,
    };

    if (this.data) {
      this.loanService.updateLoan(this.data.id, request).subscribe({
        next: () => {
          this.snackBar.open('La actualización del préstamo fue exitoso', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al actualizar el prestamo:', err);
        },
      });
    } else {
      this.loanService.createLoan(request).subscribe({
        next: () => {
          this.snackBar.open('El préstamo fue exitoso', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al crear el prestamo:', err);
        },
      });
    }
  }
}
