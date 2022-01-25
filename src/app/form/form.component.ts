import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  Math = Math;
  variables: number[] = [];
  genders: string[] = ['Male', 'Female'];
  calorieForm!: FormGroup;
  macroForm!: FormGroup;

  error: string = '';

  calories: number = 0;
  calorieDifference: number = 0;

  protein: number = 0;
  proteinCalories: number = 0;
  carb: number = 0;
  carbCalories: number = 0;
  fat: number = 0;
  fatCalories: number = 0;

  
  constructor(private fb: FormBuilder){  
  }
  
  ngOnInit(){
    this.initializeForm();
  }

  initializeForm(): void {
    this.calorieForm = this.fb.group({
      deficit: '',
      gender: '',
      weight: '',
      height: this.fb.group({
        feet: '',
        inches: ''
      }),
      age: '',
      activity: ''
    });

    this.macroForm = this.fb.group({
      carbPercentage: .55,
      fatPercentage: .45
    })
  }


  /* how to grab data from a select in a form?
  selectGender(event: Event): void {
    if(event !== null){
      this.calorieForm.patchValue({
        gender: event.target.value
      });
    }
  }
  */

  onSubmitCalorie(){
    let weight = this.calorieForm.value.weight;
    let feet = this.calorieForm.value.height.feet * 12
    let inches = this.calorieForm.value.height.inches;
    let height = +feet + +inches;
    let age = this.calorieForm.value.age;
    let activity = this.calorieForm.value.activity;
    let gender = this.calorieForm.value.gender;
    let deficit = this.calorieForm.value.deficit;
    let tdee = 0;
    let bmr = 0;
    let calDef = 0;
    let calIntake = 0;
    if(gender == 1){
      bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
    } else if(gender == 2){
      bmr = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
    }
    console.log(this.calorieForm.value);
    if(activity == 1){
      let tdee = 1.375;
      tdee = tdee * bmr;
      calDef = deficit * tdee;
      calIntake = tdee - calDef;
    } else if (activity == 2){
      let tdee = 1.55;
      tdee = tdee * bmr;
      calDef = deficit * tdee;
      calIntake = tdee - calDef;
    } else if (activity == 3){
      let tdee = 1.725;
      tdee = tdee * bmr;
      calDef = deficit * tdee;
      calIntake = tdee - calDef;
    }

    this.calories = Math.round(calIntake);
    this.protein = weight;

    this.onSubmitMacro();

    return Math.round(calIntake);
  }

  onSubmitMacro(){
    this.error = (parseFloat(this.macroForm.value.carbPercentage) + parseFloat(this.macroForm.value.fatPercentage) > 1) ? 'Your percentages are over 100!' : '';

    this.proteinCalories = this.protein * 4;
    this.calorieDifference = this.calories - this.proteinCalories;
    this.carbCalories = parseFloat(this.macroForm.value.carbPercentage) * this.calorieDifference;
    this.carb = Math.round(this.carbCalories / 4);
    this.fatCalories = parseFloat(this.macroForm.value.fatPercentage) * this.calorieDifference;
    this.fat = Math.round(this.fatCalories / 9);

  }

  

}
