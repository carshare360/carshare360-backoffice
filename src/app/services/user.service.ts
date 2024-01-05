import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first, map } from 'rxjs';
import { AuthLoginRequest } from '../interfaces/AuthLoginRequest.interface';
import { AuthLoginResponse } from '../interfaces/AuthLoginResponse.interface';
import { GetUsersResponse } from '../interfaces/GetUsersResponse.interface';
import { User } from '../interfaces/User.interface';
import { AddBlacklistUserRequest } from '../interfaces/AddBlacklistUserRequest.interface';
import { Vehicle } from '../interfaces/Vehicle';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://54.91.169.225:3000/api/v1/';
  private isAuthorized: boolean = false;
  private authTokenKey = 'adminAuthToken';
  private adminToken = '';
  private _me!: any;

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem(this.authTokenKey);
    this.isAuthorized = !!storedToken;
  }
  getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}users`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: 'Bearer ' + this.adminToken,
    });
    console.log('Bearer ' + this.adminToken);
    return this.http.get<User[]>(url, { headers: headers });
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
            this.adminToken = response.token;
            this._me = {
              id: response.id,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
            };
            this.setAuthorized(true);
          }
          return response;
        })
      );
  }
  getMe() {
    return this._me;
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
  addBlacklistUser(req: AddBlacklistUserRequest): Observable<any> {
    const url = `${this.apiUrl}auth/add-blacklist`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: 'Bearer ' + this.adminToken,
    });
    return this.http.post(url, req, { headers: headers });
  }
  getVehicles(): Observable<Vehicle[]> {
    const url = `${this.apiUrl}vehicles`;
    console.log(url);
    const headers = new HttpHeaders({
      Accept: '*/*',
    });
    return this.http.get<Vehicle[]>(url, { headers: headers });
  }
}
