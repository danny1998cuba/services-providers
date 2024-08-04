import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private password: string | undefined = ''

  constructor(
    private router: Router,
    public firestore: Firestore
  ) {
    let users = collection(firestore, 'users');
    (collectionData<{ username: string, password: string }>(users) as Observable<{ username: string, password: string }[]>).subscribe(res => {
      this.password = res.find(({ username }) => username === 'authorized_user')?.password
    })
  }

  getPassword(): string | undefined {
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
