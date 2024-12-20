import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanyardComponent } from './lanyard.component';

describe('LanyardComponent', () => {
  let component: LanyardComponent;
  let fixture: ComponentFixture<LanyardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanyardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanyardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
