import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProducto } from './asignar-producto';

describe('AsignarProducto', () => {
  let component: AsignarProducto;
  let fixture: ComponentFixture<AsignarProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
