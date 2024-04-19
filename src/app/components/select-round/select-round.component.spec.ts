import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoundComponent } from './select-round.component';

describe('SelectRoundComponent', () => {
  let component: SelectRoundComponent;
  let fixture: ComponentFixture<SelectRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
