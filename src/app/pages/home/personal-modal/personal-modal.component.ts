import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {FieldInputComponent} from "@lib/components";
import {Personal, Response} from "@lib/interfaces";
import {PersonalService} from "@lib/services";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-personal-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule,FieldInputComponent,MatSnackBarModule],
  templateUrl: './personal-modal.component.html',
  styleUrls: ['./personal-modal.component.css']
})
export class PersonalModalComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  form!: FormGroup;
  description:string;
  personal!:Personal|null;
  name = new FormControl("", [Validators.required, Validators.minLength(3)]);
  surname = new FormControl("", [Validators.required, Validators.minLength(3)]);
  email = new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  errorMessages = (name:string,errors?:ValidationErrors|null):string=> {
    return {
      name: [
        {type: 'required', message: 'Name is required'},
        {type: 'minlength', message: 'Name must be at least 3 characters long'},
      ],
      surname: [
        {type: 'required', message: 'Surname is required'},
        {type: 'minlength', message: 'Surname must be at least 3 characters long'},
      ],
      email: [
        {type: 'required', message: 'Email is required'},
        {type: 'pattern', message: 'Please enter a valid email address'},
      ],
    }[name]?.find((m:any) => errors?.hasOwnProperty(m.type) )?.message || '';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonalModalComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,private _personalService: PersonalService,private _snackBar: MatSnackBar) {
    this.personal=data;
    this.description = data.description;
  }


  save() {
    if(!this.name.invalid && !this.surname.invalid && !this.email.invalid){
      if(!this.personal?.hasOwnProperty('id')) {
        this._personalService.savePersonal({
          name: this.name.value || '',
          surname: this.surname.value || '',
          email: this.email.value || ''
        })
          .subscribe((res: Response<boolean>) => {
            if (res.status){
              this._snackBar.open('Personal saved', 'Close', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.dialogRef.close(res);
            }
            else {
              this._snackBar.open('Personal not saved', 'Close', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            }
          });
      }
      else{
        this._personalService.updatePersonal({
          id:this.personal.id,
          name: this.name.value || '',
          surname: this.surname.value || '',
          email: this.email.value || ''
        })
          .subscribe((res: Response<boolean>) => {
            if (res.status){
              this._snackBar.open('Personal updated', 'Close', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.dialogRef.close(res);
            }
            else {
              this._snackBar.open('Personal not updated', 'Close', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            }
          });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

}
