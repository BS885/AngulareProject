import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<{ userId: string, token: string, role: string }> {
    console.log(email, password);
    const body = { email, password };
    return this.http.post<{ userId: string, token: string, role: string }>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(response => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('id', response.userId);
          sessionStorage.setItem('role', response.role);
        }),
        map(response => response) // החזרת הנתונים מה-observable
      );
  }
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}
