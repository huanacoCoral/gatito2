import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeEmergencia } from './informe-emergencia';

describe('InformeEmergencia', () => {
  let component: InformeEmergencia;
  let fixture: ComponentFixture<InformeEmergencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeEmergencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeEmergencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
