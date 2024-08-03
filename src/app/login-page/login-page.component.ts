import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { AuthenticationService } from '../api/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

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
  errorMessage = signal('');

  constructor(
    private authenticationService: AuthenticationService,
    private toastService: ToastrService
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
      this.toastService.error('La contraseña es incorrecta', '', {
        closeButton: true,
        titleClass: 'hidden'
      });
    } else {
      this.authenticationService.login()
    }
  }
}
