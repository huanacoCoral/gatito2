import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Maquinista } from './maquinista';

describe('Maquinista', () => {
  let component: Maquinista;
  let fixture: ComponentFixture<Maquinista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Maquinista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Maquinista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
