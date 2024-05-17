import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EFooterComponent } from './e-footer.component';

describe('EFooterComponent', () => {
  let component: EFooterComponent;
  let fixture: ComponentFixture<EFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
