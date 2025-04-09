import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientsDto } from '../models/clients.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'https://localhost:7284/api/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<ClientsDto[]> {
    return this.http.get<ClientsDto[]>(this.apiUrl);
  }

}
