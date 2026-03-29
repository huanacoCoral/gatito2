import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarInf } from './visualizar-inf';

describe('VisualizarInf', () => {
  let component: VisualizarInf;
  let fixture: ComponentFixture<VisualizarInf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarInf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarInf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
