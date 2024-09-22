import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-periodic-table-filtering',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './periodic-table-filtering.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodicTableFilteringComponent {
  private _destroyRef = inject(DestroyRef);
  @ViewChild('filterValueInput') inputField: ElementRef | null = null;
  public filterEvent = output<string>();
  public filterValue = '';

  ngAfterViewInit() {
    this.filterOnKeyUp();
  }

  filterOnKeyUp() {
    fromEvent(this.inputField?.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(2000),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((value) => this.filterEvent.emit(value));
  }

  clearFilterField() {
    this.filterValue = '';
    this.filterEvent.emit(this.filterValue);
  }
}
