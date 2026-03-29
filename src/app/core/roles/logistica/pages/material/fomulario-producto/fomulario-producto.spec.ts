import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FomularioProducto } from './fomulario-producto';

describe('FomularioProducto', () => {
  let component: FomularioProducto;
  let fixture: ComponentFixture<FomularioProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FomularioProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FomularioProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
