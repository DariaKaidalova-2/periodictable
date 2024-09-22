import { Injectable, signal, Signal } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { rxActions } from '@rx-angular/state/actions';
import { PeriodicElement } from '../interfaces/periodic-element.interface';
import { mockPeriodicElements } from '../constants/periodic-elements.const';

@Injectable({
  providedIn: 'root'
})
export class PeriodicRestMockService {
  private state = rxState<{ periodicElements: PeriodicElement[], filterValue: string }>(({ set, connect }) => {
    set({ periodicElements: [], filterValue: '' });
    connect('periodicElements', signal(mockPeriodicElements))
  });

  private actions = rxActions<{updatePeriodicElement: PeriodicElement}>();

  public periodicElements: Signal<PeriodicElement[]> = this.state.computed(({ periodicElements, filterValue }) => {
    const value = filterValue().toLowerCase();
    if (value.trim().length === 0) {
      return periodicElements();
    }
    return periodicElements().filter((element) =>
    element.name.toLowerCase().includes(value) ||
    element.symbol.toLowerCase().includes(value) || 
    element.weight.toString().includes(value));
  });

  public updatePeriodicElement(periodicElement: PeriodicElement) {
    this.actions.updatePeriodicElement(periodicElement);
  }

  public updateFilterValue(filterValue: string) {
    this.state.set({ filterValue });
  }

  constructor() {
    this.actions.onUpdatePeriodicElement(
      (periodicElement$) => periodicElement$.pipe(),
      (periodicElement) => {
        const updatedPeriodicElements = this.state.get().periodicElements.map((el) => {
          if (el.position === periodicElement.position) {
            return {...periodicElement}
          } else {
            return {...el}
          }
        });
        this.state.set({periodicElements: updatedPeriodicElements});
      }
    )
  }
}
