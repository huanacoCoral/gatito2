import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoUtilizado } from './vehiculo-utilizado';

describe('VehiculoUtilizado', () => {
  let component: VehiculoUtilizado;
  let fixture: ComponentFixture<VehiculoUtilizado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoUtilizado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoUtilizado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
