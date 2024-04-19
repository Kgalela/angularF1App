import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeasonYearComponent } from './select-season-year.component';

describe('SelectSeasonYearComponent', () => {
  let component: SelectSeasonYearComponent;
  let fixture: ComponentFixture<SelectSeasonYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSeasonYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSeasonYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
