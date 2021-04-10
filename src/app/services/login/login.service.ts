import { Injectable } from '@angular/core';
import { LoginRequest } from "../../models/login";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly baseURL = "server";

  constructor(
    private http: HttpClient
  ) { }

  generateToken(user: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseURL}/loginservice/login`, user);
  }

  validateToken(): Observable<any> {
    let header = new HttpHeaders();
    header = header.append("Authorization", `Bearer ${localStorage.getItem("justin-token")}`);
    return this.http.post(`${this.baseURL}/loginservice/token`, null, { headers: header });
  }
}
