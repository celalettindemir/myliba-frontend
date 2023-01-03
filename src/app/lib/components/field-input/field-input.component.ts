import {Component, Input, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, ValidationErrors} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-field-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, NgIf],
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.css']
})
export class FieldInputComponent implements OnInit {

  @Input() customFormControl!: FormControl;
  @Input() errorMessage!: string;
  @Input() required!: boolean;
  @Input() getErrorMessage!: (name: string, errors?: ValidationErrors|null) => string;

  @Input() value!: string;
  @Input() name!: string;
  @Input() label!: string;
  @Input() placeHolder!: string;
  @Input() iconName!: string;

  ngOnInit(): void {
    this.customFormControl.setValue(this.value);
  }

}

