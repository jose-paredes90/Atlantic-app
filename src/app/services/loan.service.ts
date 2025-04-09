import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoansDto } from '../models/loan.dto';
import { LoansRequestDto } from '../models/load.request.dto';


@Injectable()
export class LoanService {
    private apiUrl = 'https://localhost:7119/api/loans';

  constructor(private http: HttpClient) { }

  getLoan(): Observable<LoansDto[]> {
    return this.http.get<LoansDto[]>(this.apiUrl);
  }

  createLoan(loan: LoansRequestDto): Observable<LoansDto> {
    return this.http.post<LoansDto>(this.apiUrl, loan);
  }

  returnLoan(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<void>(url, null);
  }
  
  updateLoan(id: number, request: LoansRequestDto) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, request);
  }

  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}

