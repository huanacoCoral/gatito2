import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEmergencia } from './registro-emergencia';

describe('RegistroEmergencia', () => {
  let component: RegistroEmergencia;
  let fixture: ComponentFixture<RegistroEmergencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEmergencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEmergencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
