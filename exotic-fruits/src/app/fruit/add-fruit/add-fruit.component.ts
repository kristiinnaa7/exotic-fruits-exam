import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-add-fruit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-fruit.component.html',
  styleUrls: ['./add-fruit.component.css']
})
export class AddFruitComponent {
  fruit = {
    owner: '',
    name: '',
    origin: '',
    description: '',
    imageUrl: ''
  };

  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {}
  
  addFruit(form: NgForm) {
    if (form.valid) {
      console.log('Submitting fruit:', this.fruit);
      this.apiService.createFruit(this.fruit).subscribe(
        response => {
          response.owner = this.userService.user?.username || '';
          console.log('Fruit added successfully', response);
          form.reset(); 
          this.router.navigate(['/fruits']);
        },
        error => {
          console.error('Error adding fruit', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
