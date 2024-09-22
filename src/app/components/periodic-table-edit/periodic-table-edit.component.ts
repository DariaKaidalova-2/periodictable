import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../interfaces/periodic-element.interface';

@Component({
  selector: 'app-periodic-table-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './periodic-table-edit.component.html',
  styleUrl: './periodic-table-edit.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodicTableEditComponent {
  private readonly _dialogRef = inject(MatDialogRef<PeriodicTableEditComponent>);
  private readonly _periodicElementData = inject<PeriodicElement>(MAT_DIALOG_DATA);
  public name = model(this._periodicElementData.name);
  public weight = model(this._periodicElementData.weight);
  public symbol = model(this._periodicElementData.symbol);

  cancelEdit(): void {
    this._dialogRef.close();
  }

  saveEditChanges():void {
    this._dialogRef.close(
      {
				position: this._periodicElementData.position, 
				name: this.name(), 
				weight: this.weight(), 
				symbol: this.symbol()
			}
    );
  }
}
