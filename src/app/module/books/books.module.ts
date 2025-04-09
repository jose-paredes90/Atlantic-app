import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books.routing';
import { SharedModule } from '../../shared/shared.module';
import { BooksComponent } from './books.component';
import { BooksFormComponent } from './components/books-form/books-form.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookService } from '../../services/book.service';



@NgModule({
  declarations: [BooksComponent, BooksFormComponent, BookDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    SharedModule,
    BooksRoutingModule
  ],
  providers: [
    BookService,
  ]
})
export class BooksModule { }
