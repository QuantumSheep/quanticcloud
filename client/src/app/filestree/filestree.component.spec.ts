import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilestreeComponent } from './filestree.component';

describe('FilestreeComponent', () => {
  let component: FilestreeComponent;
  let fixture: ComponentFixture<FilestreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilestreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilestreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
