import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, retry, take } from 'rxjs';
import { SeasonsResponse } from '../Models/F1';
import { Root } from '../Models/F1.d2';
import { Result } from '../Models/F1.d3';
import { Driver, info } from '../Models/F1.d4';
import { log } from 'console';

export interface RoundInfo{
  roundNumber: string;
  raceName: string;
}

export interface ResultInfo{

  driverId: string,
  driverName: string;
  nationality:string;
  dateOfBirth: string;
  position: string;
  time: string;
  Pts:string;
}

export interface driverInfo{
  driverId: string
  givenName: string
  dateOfBirth: string
  nationality: string
}





@Injectable({
  providedIn: 'root'
})
export class F1ServiceService {

  constructor(private http: HttpClient) { }
  public season: string = '';
  season$ = new BehaviorSubject<string[]>([])

  public year: string = '';
  public roundNumber: string = '';
  public rounds: RoundInfo[] = [];
  circuits$ = new BehaviorSubject<string[]>([])
  rounds$ = new BehaviorSubject<RoundInfo[]>([])
  
 
  public drivers: ResultInfo[] = [];
  result$ = new BehaviorSubject<ResultInfo[]>([])

  public DriverName: info[] = [];
  info$ = new BehaviorSubject<Driver | null>(null)
  raceWinnerId: string = '';




  getSeasons() {
    this.http.get<SeasonsResponse>('https://ergast.com/api/f1/seasons.json')
    .pipe(retry(2), take(1), catchError(err =>{
      console.error(err);
      return of({"MRData":{"xmlns":"http:\/\/ergast.com\/mrd\/1.5","series":"f1","url":"http://ergast.com/api/f1/seasons.json","limit":"30","offset":"0","total":"75","SeasonTable":{"Seasons":[{"season":"1950","url":"http:\/\/en.wikipedia.org\/wiki\/1950_Formula_One_season"},{"season":"1951","url":"http:\/\/en.wikipedia.org\/wiki\/1951_Formula_One_season"},{"season":"1952","url":"http:\/\/en.wikipedia.org\/wiki\/1952_Formula_One_season"},{"season":"1953","url":"http:\/\/en.wikipedia.org\/wiki\/1953_Formula_One_season"},{"season":"1954","url":"http:\/\/en.wikipedia.org\/wiki\/1954_Formula_One_season"},{"season":"1955","url":"http:\/\/en.wikipedia.org\/wiki\/1955_Formula_One_season"},{"season":"1956","url":"http:\/\/en.wikipedia.org\/wiki\/1956_Formula_One_season"},{"season":"1957","url":"http:\/\/en.wikipedia.org\/wiki\/1957_Formula_One_season"},{"season":"1958","url":"http:\/\/en.wikipedia.org\/wiki\/1958_Formula_One_season"},{"season":"1959","url":"http:\/\/en.wikipedia.org\/wiki\/1959_Formula_One_season"},{"season":"1960","url":"http:\/\/en.wikipedia.org\/wiki\/1960_Formula_One_season"},{"season":"1961","url":"http:\/\/en.wikipedia.org\/wiki\/1961_Formula_One_season"},{"season":"1962","url":"http:\/\/en.wikipedia.org\/wiki\/1962_Formula_One_season"},{"season":"1963","url":"http:\/\/en.wikipedia.org\/wiki\/1963_Formula_One_season"},{"season":"1964","url":"http:\/\/en.wikipedia.org\/wiki\/1964_Formula_One_season"},{"season":"1965","url":"http:\/\/en.wikipedia.org\/wiki\/1965_Formula_One_season"},{"season":"1966","url":"http:\/\/en.wikipedia.org\/wiki\/1966_Formula_One_season"},{"season":"1967","url":"http:\/\/en.wikipedia.org\/wiki\/1967_Formula_One_season"},{"season":"1968","url":"http:\/\/en.wikipedia.org\/wiki\/1968_Formula_One_season"},{"season":"1969","url":"http:\/\/en.wikipedia.org\/wiki\/1969_Formula_One_season"},{"season":"1970","url":"http:\/\/en.wikipedia.org\/wiki\/1970_Formula_One_season"},{"season":"1971","url":"http:\/\/en.wikipedia.org\/wiki\/1971_Formula_One_season"},{"season":"1972","url":"http:\/\/en.wikipedia.org\/wiki\/1972_Formula_One_season"},{"season":"1973","url":"http:\/\/en.wikipedia.org\/wiki\/1973_Formula_One_season"},{"season":"1974","url":"http:\/\/en.wikipedia.org\/wiki\/1974_Formula_One_season"},{"season":"1975","url":"http:\/\/en.wikipedia.org\/wiki\/1975_Formula_One_season"},{"season":"1976","url":"http:\/\/en.wikipedia.org\/wiki\/1976_Formula_One_season"},{"season":"1977","url":"http:\/\/en.wikipedia.org\/wiki\/1977_Formula_One_season"},{"season":"1978","url":"http:\/\/en.wikipedia.org\/wiki\/1978_Formula_One_season"},{"season":"1979","url":"http:\/\/en.wikipedia.org\/wiki\/1979_Formula_One_season"}]}}}

    )
    }))
    .subscribe(result => {
      const season = result.MRData.SeasonTable.Seasons.map((seasonObj) => seasonObj.season)
      this.season$.next(season)
      console.log(season)

  })};

  GetRounds() {
    console.log(this.year)
    this.http.get<Root>(`https://ergast.com/api/f1/${this.year}.json`)
    .pipe(retry(2), take(1))
    .subscribe(result => {
      this.rounds = result.MRData.RaceTable.Races.map(round => ({
        raceName: round.raceName,
        roundNumber: round.round
      }))
     this.rounds$.next(this.rounds)
     console.log(this.rounds)
  })};


  getRaceResults() {
    console.log('yer',this.year);
    console.log(this.roundNumber)
    this.http.get<Result>(`https://ergast.com/api/f1/${this.year}/${this.roundNumber}/results.json`)
    .pipe(retry(2),take(1))
    .subscribe(results => {
      console.log('res',results);
      
      this.drivers = results.MRData.RaceTable.Races[0].Results.map(race => ({
        driverName: race.Driver.givenName + ' ' + race.Driver.familyName,
        nationality: race.Driver.nationality,
        position: race.position,
        Pts: race.points,
        time: race.Time?.time || 'DNF',
        dateOfBirth: race.Driver.dateOfBirth,
        driverId: race.Driver.driverId
        
      }))
      this.raceWinnerId = this.drivers[0].driverId
      this.getInfo()
      this.result$.next(this.drivers)
      })


    }

    getInfo() {
      console.log('iddddd',this.raceWinnerId);
      console.log(this.year);
      console.log(this.roundNumber)
      this.http.get<info>(`http://ergast.com/api/f1/drivers/${this.raceWinnerId}.json`)
      .pipe(retry(2),take(1))
      .subscribe( (result) => {
        console.log(result);
        
        // const DriverName = result.MRData.DriverTable.Drivers.map( detail => ({
        //   givenName: detail.givenName + ' ' + detail.familyName,
        //   dateOfBirth: detail.dateOfBirth,
        //   nationality: detail.nationality,

        // }))

        this.info$.next(result.MRData.DriverTable.Drivers[0])
      } )
    }
    }


