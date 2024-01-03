import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthLoginRequest } from '../interfaces/AuthLoginRequest.interface';
import { AuthLoginResponse } from '../interfaces/AuthLoginResponse.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) {}

  authLogin(req: AuthLoginRequest): Observable<AuthLoginResponse> {
    const url = `${this.apiUrl}auth/login/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    return this.http.post<AuthLoginResponse>(url, req, { headers: headers });
  }
}
