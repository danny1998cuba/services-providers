import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Provider } from '../api/providers.model';

@Component({
  selector: 'app-provider-details',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './provider-details.component.html',
  styleUrl: './provider-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderDetailsComponent {
  provider: Provider

  constructor(
    private dialogRef: MatDialogRef<ProviderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.provider = data.provider
  }

  closeModal() {
    this.dialogRef.close()
  }

  getUrl(website: string): string {
    if (!website.startsWith('http://') && !website.startsWith('https://')) {
      return `https://${website}`
    } else {
      return website
    }
  }
}
