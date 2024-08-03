import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Provider, providersMock } from '../api/providers.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProviderDetailsComponent } from '../provider-details/provider-details.component';

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
  ],
  templateUrl: './providers-list.component.html',
  styleUrl: './providers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvidersListComponent implements OnInit {
  filter: FormControl = new FormControl(undefined)

  providers: Provider[] = []
  providersFiltered: Provider[] = []

  constructor(
    private matDialog: MatDialog
  ) {
    this.filter.valueChanges.subscribe(change => {
      // TODO: Make filtering with database consult
      console.log(change)
      if (change) {

      } else {
        this.providersFiltered = this.providers
      }
    })
  }

  ngOnInit(): void {
    this.providers = providersMock  // TODO: Load from api
    this.providersFiltered = this.providers
  }

  openProviderDetails(item: Provider) {
    this.matDialog.open(ProviderDetailsComponent, {
      data: {
        provider: item
      },
      panelClass: 'custom-modal'
    })
  }
}
