
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDto } from '../models/book.dto';
import { BookRequestDto } from '../models/book.request.dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:7284/api/books';

  constructor(private http: HttpClient) { }

  getBook(): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<BookDto> {
    return this.http.get<BookDto>(`${this.apiUrl}/${id}`);
  }

  createBook(book: BookRequestDto): Observable<BookDto> {
    return this.http.post<BookDto>(this.apiUrl, book);
  }

  updateBook(id: number, book: BookRequestDto, ) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}