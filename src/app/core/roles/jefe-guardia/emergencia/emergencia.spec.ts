import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emergencia } from './emergencia';

describe('Emergencia', () => {
  let component: Emergencia;
  let fixture: ComponentFixture<Emergencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emergencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emergencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
