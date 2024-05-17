import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESidebarComponent } from './e-sidebar.component';

describe('ESidebarComponent', () => {
  let component: ESidebarComponent;
  let fixture: ComponentFixture<ESidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ESidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ESidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
