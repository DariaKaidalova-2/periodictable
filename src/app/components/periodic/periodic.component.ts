import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { PeriodicElement } from '../../interfaces/periodic-element.interface';
import { PeriodicTableComponent } from '../periodic-table/periodic-table.component';
import { PeriodicTableFilteringComponent } from '../periodic-table-filtering/periodic-table-filtering.component';
import { PeriodicRestMockService } from '../../services/periodic-rest-mock.service';

@Component({
  selector: 'app-periodic',
  standalone: true,
  imports: [PeriodicTableComponent, PeriodicTableFilteringComponent],
  providers: [PeriodicRestMockService],
  templateUrl: './periodic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodicComponent {
  private readonly _periodicRestMockService = inject(PeriodicRestMockService);
  public periodicElements:Signal<PeriodicElement[]> = inject(PeriodicRestMockService).periodicElements;
  
  editPeriodicElement(editedPeriodicElement: PeriodicElement) {
    this._periodicRestMockService.updatePeriodicElement(editedPeriodicElement);
  }

  filterPeriodicElements(filterValue: string) {
    this._periodicRestMockService.updateFilterValue(filterValue);
  }
}
