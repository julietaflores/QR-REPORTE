import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EHeaderComponent } from './e-header.component';

describe('EHeaderComponent', () => {
  let component: EHeaderComponent;
  let fixture: ComponentFixture<EHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
