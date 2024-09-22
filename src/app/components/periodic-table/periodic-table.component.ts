import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { toObservable } from "@angular/core/rxjs-interop";
import { PeriodicElement } from '../../interfaces/periodic-element.interface';
import { PeriodicTableEditComponent } from '../periodic-table-edit/periodic-table-edit.component';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, MatIconModule],
  templateUrl: './periodic-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodicTableComponent {
  private readonly _matDialog = inject(MatDialog);
  public periodicElementsList = input.required<PeriodicElement[]>();
  public editPeriodicElementEvent = output<PeriodicElement>();
  public periodicElements$ = toObservable(this.periodicElementsList);
  public columnsToDisplay: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];

  editPeriodicElement(periodicElementPosition: number) {
    const elementToEdit = this.periodicElementsList().find(periodicElement => periodicElement.position === periodicElementPosition);
    if (elementToEdit) {
      this.openDialog(elementToEdit);
    }
  }

  openDialog(editedPeriodicElement: PeriodicElement): void {
    const dialogRef = this._matDialog.open(PeriodicTableEditComponent, {
      height: '400px',
      width: '600px',
      data: {...editedPeriodicElement}
    });

    dialogRef.afterClosed().subscribe(editedPeriodicElement => {
      if (editedPeriodicElement !== undefined) {
        this.editPeriodicElementEvent.emit(editedPeriodicElement);
      }
    });
  }
}
