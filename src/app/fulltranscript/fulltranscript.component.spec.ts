import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FulltranscriptComponent } from './fulltranscript.component';

describe('FulltranscriptComponent', () => {
  let component: FulltranscriptComponent;
  let fixture: ComponentFixture<FulltranscriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FulltranscriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FulltranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
