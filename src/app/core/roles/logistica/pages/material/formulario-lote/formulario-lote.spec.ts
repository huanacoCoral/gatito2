import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLote } from './formulario-lote';

describe('FormularioLote', () => {
  let component: FormularioLote;
  let fixture: ComponentFixture<FormularioLote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioLote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioLote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
