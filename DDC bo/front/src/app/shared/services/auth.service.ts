import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { baseURL } from '../baseurl';
import { AuthData } from "../clasees/auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  setToken(token: string) {
    this.token = token;
  }

  setIsAuthenticated(res: boolean) {
    this.isAuthenticated = res;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    return this.http.post<{ token: string; expiresIn: number }>(baseURL + "users/login", authData);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
     clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
     }
  }


  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
   }

  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    }

  getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
     if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
     }
  }
}
