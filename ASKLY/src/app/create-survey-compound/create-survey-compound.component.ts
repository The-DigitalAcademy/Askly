import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '../service/survey.service';
import { question } from '../models/question';
import { choice } from '../models/choice';

@Component({
  selector: 'app-create-survey-compound',
  templateUrl: './create-survey-compound.component.html',
  styleUrls: ['./create-survey-compound.component.css']
})
export class CreateSurveyCompoundComponent {
  surveyForm: FormGroup;
  questions: question[] = [];

  newQuestionText = '';
  currentChoices: string[] = ['', ''];
  choiceError = '';

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.surveyForm.controls;
  }

  get isQuestionValid(): boolean {
    const text = this.newQuestionText?.trim();
    if (!text) return false;

    const validChoices = this.currentChoices
      .map(c => c?.trim())
      .filter(c => c && c.length >= 1); // 1+ character

    return validChoices.length >= 2 && validChoices.length <= 5;
  }

  addChoice() {
    if (this.currentChoices.length < 5) {
      this.currentChoices.push('');
      this.choiceError = '';
    }
  }

  removeChoice(idx: number) {
    this.currentChoices.splice(idx, 1);
  }

  addQuestion() {
    if (!this.isQuestionValid) {
      this.choiceError = 'Need 2–5 valid choices (1+ character each)';
      return;
    }

    const text = this.newQuestionText.trim();
    const clean = this.currentChoices
      .map(c => c.trim())
      .filter(c => c.length >= 1);

    const q: question = {
      id: 0,
      text,
      choices: clean.map((t, i) => ({ id: i + 1, text: t } as choice)),
    };

    this.questions.push(q);

    // Reset
    this.newQuestionText = '';
    this.currentChoices = ['', ''];
    this.choiceError = '';
  }

  removeQuestion(idx: number) {
    this.questions.splice(idx, 1);
  }

  onSubmit() {
    if (this.surveyForm.invalid || this.questions.length === 0) return;

    const payload = {
      title: this.surveyForm.get('title')?.value.trim(),
      desc: this.surveyForm.get('desc')?.value?.trim() ?? '',
      questions: this.questions,
      isOpen: false,
      createdAt: new Date().toISOString()
    };

    this.surveyService.createSurvey(payload).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: err => console.error('Save error', err)
    });
  }
}