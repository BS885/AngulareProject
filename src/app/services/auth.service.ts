import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http:/localhost:3000/api/auth';
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const body = { email, password }; 
    return this.http.post<any>(`${this.apiUrl}/login`, body); 
  }
}
