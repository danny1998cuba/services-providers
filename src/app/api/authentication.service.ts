import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private password: string = ''

  constructor(
    private router: Router
  ) {
    this.password = 'admin123'  // TODO: Fetch from database
  }

  getPassword(): string {
    return this.password
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('logged') === 'true'
  }

  login() {
    sessionStorage.setItem('logged', 'true')
    this.router.navigateByUrl('/providers')
  }
}
