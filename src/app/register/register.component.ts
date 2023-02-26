import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
        username: ['', [Validators.required,Validators.minLength(3)]],
        email: ['', [Validators.required,Validators.minLength(3)]],
        password:['', [Validators.required,Validators.minLength(6)]]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const username = this.form.controls['username'].value;
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    console.log(this.form)

    this.authService.register(username!, email!, password!).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
