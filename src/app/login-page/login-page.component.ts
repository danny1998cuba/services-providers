import { ChangeDetectionStrategy, Component, HostListener, Inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { AuthenticationService } from '../api/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  readonly password = new FormControl('', [Validators.required]);
  readonly durationInSeconds = 2;

  errorMessage = signal('');

  constructor(
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorMessage.set('La contraseña es obligatoria');
    } else {
      this.errorMessage.set('');
    }
  }

  submit() {
    if (this.password.value !== this.authenticationService.getPassword()) {
      this._snackBar.openFromComponent(ErrorSnackBar, {
        duration: this.durationInSeconds * 1000,
        data: { message: 'La contraseña es incorrecta' },
        panelClass: 'error-snackbar'
      });
    } else {
      this.authenticationService.login()
    }
  }
}


@Component({
  selector: 'app-error-snackbar',
  template: `
  <div class="flex justify-between">
    <span class="example-pizza-party">
      {{data.message}}
    </span>
    <mat-icon>close</mat-icon>
  </div>
  `,
  styles: ``,
  imports: [
    MatIconModule
  ],
  standalone: true,
})
export class ErrorSnackBar {
  @HostListener('click') click = () => {
    this.snackBarRef.dismiss()
  }

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) protected data: any,
    private snackBarRef: MatSnackBarRef<ErrorSnackBar>
  ) { }
}
