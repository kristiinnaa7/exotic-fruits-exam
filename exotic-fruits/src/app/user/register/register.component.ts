import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, emailValidator(DOMAINS)]],
      tel: [''],
      passGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(5)]],
          rePassword: ['', [Validators.required]],
        },
        { validators: [matchPasswordsValidator('password', 'rePassword')] }
      ),
    });
  }

  get passGroup() {
    return this.form.get('passGroup');
  }

  isFieldTextMissing(controlName: string): boolean {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  get isNotMinLength(): boolean {
    return (
      this.form.get('username')?.touched &&
      this.form.get('username')?.errors?.['minlength']
    );
  }

  get isEmailNotValid(): boolean {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['emailValidator']
    );
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const { username = '', email = '', tel = '' } = this.form.value || {};
    const { password = '', rePassword = '' } = this.passGroup?.value || {};

    this.userService
      .register(username, email, tel, password, rePassword)
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => console.error('Registration failed:', err),
      });
  }
}
