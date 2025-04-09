import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanComponent } from './loan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { LoanRoutingModule } from './loan.routing';
import { LoanService } from '../../services/loan.service';
import { BookCopyService } from '../../services/book-copy.service';
import { ClientsService } from '../../services/clients.service';



@NgModule({
  declarations: [
    LoanComponent,
    LoanFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    LoanRoutingModule
  ],
  providers: [
    LoanService,
    BookCopyService,
    ClientsService
  ]
})
export class LoanModule { }
