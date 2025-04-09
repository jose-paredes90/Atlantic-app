import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL } from './material';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MessageSuccessComponent } from './components/message-success/message-success.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ConfirmationComponent, NavbarComponent, MessageSuccessComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL,
    RouterModule
  ],
  exports: [
    ConfirmationComponent,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    MessageSuccessComponent,
    RouterModule,
    ...MATERIAL
  ]

})
export class SharedModule { }
