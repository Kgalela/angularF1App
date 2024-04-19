import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectSeasonYearComponent } from "./components/select-season-year/select-season-year.component";
import { SelectRoundComponent } from "./components/select-round/select-round.component";
import {F1ServiceService} from "./Services/f1-service.service";
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from "./components/results/results.component";
import { InfoComponent } from "./components/info/info.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SelectSeasonYearComponent, SelectRoundComponent, ResultsComponent, InfoComponent]
})
export class AppComponent {
  title = 'my-angularF1-app';

  }

