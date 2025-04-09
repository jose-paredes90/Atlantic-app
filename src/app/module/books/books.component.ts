import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BooksFormComponent } from './components/books-form/books-form.component';
import { DialogService } from '../../shared/services/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { BookDto } from '../../models/book.dto';
import { BookService } from '../../services/book.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'titulo',
    'autor',
    'categoria',
    'precio',
    'acciones',
  ];
  books: BookDto[] = [];
  dataSource = new MatTableDataSource<BookDto>();

  constructor(
    private bookSevice: BookService,
    private readonly router: Router,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookSevice.getBook().subscribe(books => {
      this.dataSource = new MatTableDataSource<BookDto>(books);
      this.dataSource.paginator = this.paginator;
    });
  }  

  openBookModal(books?: BookDto) {
    const dialogRef = this.dialog.open(BooksFormComponent, {
      width: '600px',
      height: 'auto',
      maxWidth: '90vw',
      data: books,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getBooks();
      }
    });
  }

  onDelete(bookId: number) {
    this.dialogService
      .confirmationModal('¿Desea eliminar el registro?')
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) {
          console.log('Eliminando libro con ID:', bookId);
          console.log('response', response);
          this.bookSevice.deleteBook(bookId).subscribe(() => {
            this.getBooks();
          });
        }
      });
  }
  

  onDetail(bookId: number) {
    this.router.navigate(['/libros', bookId]); 
  }
}
