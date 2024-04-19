import { Component, OnInit, inject } from '@angular/core';
import { F1ServiceService } from '../../Services/f1-service.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DxButtonModule } from 'devextreme-angular';


@Component({
  selector: 'app-select-season-year',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, DxButtonModule],
  templateUrl: './select-season-year.component.html',
  styleUrl: './select-season-year.component.css'
})
export class SelectSeasonYearComponent implements OnInit {
  f1Service = inject(F1ServiceService)


  seasons: string[] = [];

  constructor() {
    this.f1Service.season$.subscribe(seasons => this.seasons = seasons)
  }

  ngOnInit(): void {
    this.f1Service.getSeasons();
  }

  selectedYear(year: string){
    this.f1Service.year = year;
    this.handleGetResult();
    console.log(year)
  }

  handleGetResult(){
    this.f1Service.GetRounds();
  }


}


