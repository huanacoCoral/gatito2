import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDatosTs } from './ver-datos.ts';

describe('VerDatosTs', () => {
  let component: VerDatosTs;
  let fixture: ComponentFixture<VerDatosTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDatosTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDatosTs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
