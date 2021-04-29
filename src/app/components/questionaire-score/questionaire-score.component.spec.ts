import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionaireScoreComponent } from './questionaire-score.component';

describe('QuestionaireScoreComponent', () => {
  let component: QuestionaireScoreComponent;
  let fixture: ComponentFixture<QuestionaireScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionaireScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionaireScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
