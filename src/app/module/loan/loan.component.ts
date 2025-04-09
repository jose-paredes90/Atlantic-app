import { Component, OnInit, ViewChild } from '@angular/core';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LoanService } from '../../services/loan.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoansDto } from '../../models/loan.dto';
import { LoantatusEnum } from '../../shared/enums/loan.status.enum';
import { DialogService } from '../../shared/services/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss',
})
export class LoanComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'libroId',
    'clienteId',
    'fechaPrestamo',
    'fechaDevolucion',
    'fechaVencimiento',
    'estado',
    'acciones',
  ];
  loans: LoansDto[] = [];
  dataSource = new MatTableDataSource<LoansDto>();

  constructor(
    private loanService: LoanService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadPrestamos();
  }

  loadPrestamos() {
    this.loanService.getLoan().subscribe((loans) => {
      this.dataSource = new MatTableDataSource<LoansDto>(loans);
      this.dataSource.paginator = this.paginator;
    });
  }

  isBorrowed(status: number) {
    return status == LoantatusEnum.Borrowed;
  }

  returnLoan(id: number) {
    this.loanService.returnLoan(id).subscribe(() => {
      this.snackBar.open('La libro fue devuelto exitosamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.loadPrestamos();
    });
  }

  openPrestamoModal(prestamo?: LoansDto): void {
    const dialogRef = this.dialog.open(LoanFormComponent, {
      width: '600px',
      height: 'auto',
      maxWidth: '90vw',
      data: prestamo,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadPrestamos();
      }
    });
  }

  deletePrestamo(id: number) {
    this.dialogService
      .confirmationModal('¿Desea eliminar el registro?')
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) {
          this.loanService.deleteLoan(id).subscribe(() => {
            this.loadPrestamos();
          });
        }
      });
  }

  getStatusText(status: number): string {
    switch (status) {
      case LoantatusEnum.Borrowed:
        return 'Prestado';
      case LoantatusEnum.Overdue:
        return 'Atrasado';
      case LoantatusEnum.Returned:
        return 'Devuelto';
      case LoantatusEnum.Lost:
        return 'Perdido';
      default:
        return 'Desconocido';
    }
  }
}
