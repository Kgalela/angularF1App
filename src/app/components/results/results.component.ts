import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { F1ServiceService } from '../../Services/f1-service.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatTableModule,AsyncPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  f1Servicerace = inject(F1ServiceService);
  result$ = this.f1Servicerace.result$;


 
  displayedColumns: string[] = ['position', 'driverName', 'nationality', 'Pts', 'time','driverId'];
}


