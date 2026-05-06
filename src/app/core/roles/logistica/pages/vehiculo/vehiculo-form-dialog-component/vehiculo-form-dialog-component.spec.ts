import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoFormDialogComponent } from './vehiculo-form-dialog-component';

describe('VehiculoFormDialogComponent', () => {
  let component: VehiculoFormDialogComponent;
  let fixture: ComponentFixture<VehiculoFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
