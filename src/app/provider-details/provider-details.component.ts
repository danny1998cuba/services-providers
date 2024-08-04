import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Provider } from '../api/providers.model';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

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

  style = {}

  constructor(
    private dialogRef: MatDialogRef<ProviderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    storage: Storage,
    private _cdr: ChangeDetectorRef
  ) {
    this.provider = data.provider
    if (this.provider.foto) {
      getDownloadURL(ref(storage, `fotos_providers/${this.provider.foto}`)).then(url => {
        this.style = {
          background: `no-repeat center / cover url(${url})`
        }
        _cdr.detectChanges()
      })
    } else {
      this.style = {}
    }
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
