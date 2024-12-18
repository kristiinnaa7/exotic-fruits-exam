import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fruit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-fruit.component.html',
  styleUrls: ['./add-fruit.component.css']
})
export class AddFruitComponent {
  fruit = {
    name: '',
    origin: '',
    description: '',
    imageUrl: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  addFruit(form: NgForm) {
    if (form.valid) {
      console.log('Submitting fruit:', this.fruit);
      this.apiService.createFruit(this.fruit).subscribe(
        response => {
          console.log('Fruit added successfully', response);
          form.reset(); 
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
