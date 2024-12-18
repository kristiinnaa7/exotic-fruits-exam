import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { ProfileDetails } from '../../types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  isEditMode: boolean = false;
  profileDetails: ProfileDetails = {
    username: 'Jack',
    email: 'jacksmith127@gmail.com',
    tel: '885-888-888',
  };

  form = new FormGroup({
    username: new FormControl(this.profileDetails.username, [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl(this.profileDetails.email, [
      Validators.required,
      emailValidator(DOMAINS),
    ]),
    tel: new FormControl(this.profileDetails.tel),
  });
  constructor(private userService: UserService) {}
  get firstName(): string {
    return this.userService.user?.username || '';
  }
  get email(): string {
    return this.userService.user?.email || '';
  }
  get phone(): string {
    return this.userService.user?.tel || '';
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    this.toggleEditMode();
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }

}
