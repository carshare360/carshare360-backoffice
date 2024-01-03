import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthLoginRequest } from '../interfaces/AuthLoginRequest.interface';
import { AuthLoginResponse } from '../interfaces/AuthLoginResponse.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/';
  private isAuthorized: boolean = false;
  private authTokenKey = 'adminAuthToken';

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem(this.authTokenKey);
    this.isAuthorized = !!storedToken;
    console.log(this.isAuthorized);
  }

  authLogin(req: AuthLoginRequest): Observable<AuthLoginResponse> {
    const url = `${this.apiUrl}auth/login/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    return this.http
      .post<AuthLoginResponse>(url, req, { headers: headers })
      .pipe(
        map((response) => {
          if (response.token) {
            localStorage.setItem(this.authTokenKey, response.token);
            console.log(localStorage.getItem(this.authTokenKey));
            this.setAuthorized(true);
          }
          return response;
        })
      );
  }
  setAuthorized(b: boolean) {
    this.isAuthorized = b;
  }
  getAuthorized(): boolean {
    return this.isAuthorized;
  }
  logout() {
    localStorage.removeItem(this.authTokenKey);
    this.setAuthorized(false);
  }
}
