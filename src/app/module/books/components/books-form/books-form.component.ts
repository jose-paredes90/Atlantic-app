import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookDto } from '../../../../models/book.dto';
import { BookRequestDto } from '../../../../models/book.request.dto';
import { BookService } from '../../../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrl: './books-form.component.scss',  
})

export class BooksFormComponent {
  booksForm!: FormGroup;
  editingLibro: BookDto | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BooksFormComponent>,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: BookDto
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setBooks();
  }

  createForm() {
    this.booksForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [, [Validators.required, Validators.min(0)]],
    });
  }

  setBooks() {
    if (this.data) {
      console.log('data', this.data);
      this.booksForm.patchValue({
        titulo: this.data.title,
        autor: this.data.author,
        categoria: this.data.category,
        precio: this.data.price,
      });
      this.editingLibro = this.data;
    }
  }

  createBook() {
    if (this.booksForm.invalid) {
      return;
    }
    console.log(this.booksForm);

    const request: BookRequestDto = {
      title: this.booksForm?.value.titulo,
      author: this.booksForm?.value.autor,
      category: this.booksForm?.value.categoria,
      price: this.booksForm?.value.precio,
    };

    if (this.editingLibro) {
      this.bookService.updateBook(this.editingLibro.id, request).subscribe({
        next: () => {
          this.snackBar.open('Libro actualizado correctamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al actualizar el libro:', err);
        },
      });
    } else {
      this.bookService.createBook(request).subscribe({
        next: () => {
          this.snackBar.open('Libro creado exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al crear el libro:', err);
        },
      });
    }
  }
}
