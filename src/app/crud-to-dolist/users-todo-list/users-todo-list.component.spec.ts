import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTodoListComponent } from './users-todo-list.component';

describe('UsersTodoListComponent', () => {
  let component: UsersTodoListComponent;
  let fixture: ComponentFixture<UsersTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
