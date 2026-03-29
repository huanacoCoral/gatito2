import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FomularioMaterial } from './fomulario-material';

describe('FomularioMaterial', () => {
  let component: FomularioMaterial;
  let fixture: ComponentFixture<FomularioMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FomularioMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FomularioMaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
