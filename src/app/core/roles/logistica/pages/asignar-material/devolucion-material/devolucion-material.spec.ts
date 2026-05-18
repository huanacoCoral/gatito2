import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionMaterial } from './devolucion-material';

describe('DevolucionMaterial', () => {
  let component: DevolucionMaterial;
  let fixture: ComponentFixture<DevolucionMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucionMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucionMaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
