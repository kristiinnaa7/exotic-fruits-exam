import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  recipe = {
    _id: '',
    name: '',
    ingredients: [],
    imageUrl: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  addRecipe(form: NgForm) {
    if (form.valid) {
      console.log('Submitting recipe:', this.recipe);
      this.apiService.createRecipe(this.recipe).subscribe(
        response => {
          console.log('Recipe added successfully', response);
          form.reset(); 
        },
        error => {
          console.error('Error adding recipe', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
}
