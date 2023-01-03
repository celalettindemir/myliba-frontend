import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutHorizontalComponent } from './layout-horizontal.component';

describe('LayoutHorizontalComponent', () => {
  let component: LayoutHorizontalComponent;
  let fixture: ComponentFixture<LayoutHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutHorizontalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
