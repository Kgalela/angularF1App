import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { F1ServiceService, RoundInfo } from '../../Services/f1-service.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-select-round',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, AsyncPipe],
  templateUrl: './select-round.component.html',
  styleUrl: './select-round.component.css'
})
export class SelectRoundComponent {
  f1Servicerace = inject(F1ServiceService);
  public rounds: RoundInfo[] = [];
  rounds$ = this.f1Servicerace.rounds$;

  selectedRound(round: RoundInfo){
    this.f1Servicerace.roundNumber = round.roundNumber;
    this.f1Servicerace.getRaceResults();


  }

}
