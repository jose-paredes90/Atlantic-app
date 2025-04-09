import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../../services/book.service';
import { BookDto } from '../../../../models/book.dto';
import { MatTableDataSource } from '@angular/material/table';
import { BookCopyStatusEnum } from '../../../../shared/enums/book.copy.status.enum';
import { BookCopyDto } from '../../../../models/book-copy.dto';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent {
  book: BookDto | null = null;
  dataSource = new MatTableDataSource<BookCopyDto>();
  displayedColumns: string[] = ['barcode', 'status'];
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.bookService.getBookById(id).subscribe((bookData) => {
      this.book = bookData;
      if (bookData.bookCopies) {
        console.log('Book Copies:', bookData.bookCopies);
        this.dataSource.data = bookData.bookCopies;
      }
    });
  }

  
  onBack() {
    this.router.navigate(['/libros']);
  }

  getStatusText(status: number): string {
    switch (status) {
      case BookCopyStatusEnum.Borrowed:
        return 'Prestado';
      case BookCopyStatusEnum.Available:
        return 'Disponible';
      case BookCopyStatusEnum.Lost:
        return 'Perdido';
      default:
        return 'Desconocido';
    }
  }
}
