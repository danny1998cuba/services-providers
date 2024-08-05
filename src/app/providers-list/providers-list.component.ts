import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Provider } from '../api/providers.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProviderDetailsComponent } from '../provider-details/provider-details.component';
import { FirebaseServiceService } from '../api/firebase-service.service';
import { BehaviorSubject, combineLatest, debounceTime, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { data } from '../api/firebase';

@Component({
  selector: 'app-providers-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './providers-list.component.html',
  styleUrl: './providers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvidersListComponent implements OnInit {
  filter: FormControl = new FormControl(undefined)

  providers: Provider[] = []
  providersFiltered: Provider[] = []
  param: BehaviorSubject<string> = new BehaviorSubject('')

  loadingProviders: boolean = true
  finishedDbQuery = false

  constructor(
    private matDialog: MatDialog,
    private firebaseService: FirebaseServiceService,
    private _cdr: ChangeDetectorRef
  ) {
    this.filter.valueChanges.subscribe(change => {
      if (!change || change === '') {
        this.param.next('')
      } else {
        this.loadingProviders = true
        this.param.next(change.trim())
      }
    })
  }

  ngOnInit(): void {
    this.loadingProviders = true
    this.firebaseService.getProviders().subscribe(providers => {
      this.providers = providers
      this.finishedDbQuery = true
      this.param.next('')
      this._cdr.detectChanges()
    })

    combineLatest([this.param])
      .subscribe(([param]: [string]) => {
        if (this.finishedDbQuery) {
          if (param !== '') {
            this.providersFiltered = this.providers.filter(p => {
              return p.nombre.toLowerCase().includes(param.toLowerCase())
                || p.servicio.toLowerCase().includes(param.toLowerCase())
                || p.detalle_servicio.toLowerCase().includes(param.toLowerCase())
            })
          } else {
            this.providersFiltered = this.providers
          }

          this.loadingProviders = false
          this._cdr.detectChanges()
        }
      })
  }

  openProviderDetails(item: Provider) {
    this.matDialog.open(ProviderDetailsComponent, {
      data: {
        provider: item
      },
      panelClass: 'custom-modal',
      width: '80%',
      maxWidth: '600px',
      maxHeight: '85%'
    })
  }
}
