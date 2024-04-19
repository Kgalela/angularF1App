import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { F1ServiceService } from '../../Services/f1-service.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  f1Servicerace = inject(F1ServiceService);

 
  info$ = this.f1Servicerace.info$;
}
