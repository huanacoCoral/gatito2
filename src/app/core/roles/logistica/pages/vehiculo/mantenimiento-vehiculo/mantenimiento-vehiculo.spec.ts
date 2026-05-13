import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoVehiculo } from './mantenimiento-vehiculo';

describe('MantenimientoVehiculo', () => {
  let component: MantenimientoVehiculo;
  let fixture: ComponentFixture<MantenimientoVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoVehiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoVehiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
