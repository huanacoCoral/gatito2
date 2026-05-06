import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEmergencia } from './formulario-emergencia';

describe('FormularioEmergencia', () => {
  let component: FormularioEmergencia;
  let fixture: ComponentFixture<FormularioEmergencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEmergencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEmergencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
