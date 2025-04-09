import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookCopyRequestDto } from '../models/book-copy.request.dto';
import { BookCopyDto } from '../models/book-copy.dto';

@Injectable({
  providedIn: 'root',
})
export class BookCopyService {
  private apiUrl = 'https://localhost:7284/api/bookcopy';

  constructor(private http: HttpClient) {}

  registerBookCopy(request: BookCopyRequestDto): Observable<BookCopyDto> {
    return this.http.post<BookCopyDto>(this.apiUrl, request);
  }

  getAllBookCopies(status?: number): Observable<BookCopyDto[]> {
    return this.http.get<BookCopyDto[]>(`${this.apiUrl}?status=${status}` );
  }
}
