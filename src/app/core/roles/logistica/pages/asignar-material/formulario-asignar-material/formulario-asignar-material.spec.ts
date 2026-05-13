import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAsignarMaterial } from './formulario-asignar-material';

describe('FormularioAsignarMaterial', () => {
  let component: FormularioAsignarMaterial;
  let fixture: ComponentFixture<FormularioAsignarMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAsignarMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAsignarMaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
