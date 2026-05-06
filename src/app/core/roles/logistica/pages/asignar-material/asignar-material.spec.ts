import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMaterial } from './asignar-material';

describe('AsignarMaterial', () => {
  let component: AsignarMaterial;
  let fixture: ComponentFixture<AsignarMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarMaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
