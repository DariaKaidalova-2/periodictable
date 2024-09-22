import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PeriodicComponent } from './components/periodic/periodic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PeriodicComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'periodictable';
}