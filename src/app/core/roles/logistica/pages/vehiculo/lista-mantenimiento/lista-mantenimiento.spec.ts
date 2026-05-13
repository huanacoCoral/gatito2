import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMantenimiento } from './lista-mantenimiento';

describe('ListaMantenimiento', () => {
  let component: ListaMantenimiento;
  let fixture: ComponentFixture<ListaMantenimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMantenimiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMantenimiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
