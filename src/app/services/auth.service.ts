import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    console.log(email, password);
    const body = { email, password }; 
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, body); 
  }
  register(user:User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}
