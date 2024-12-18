import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  recipe = {
    owner: '',
    name: '',
    ingredients: [''],
    imageUrl: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  addRecipe(form: NgForm) {
    if (form.valid) {
      console.log('Submitting recipe:', this.recipe);
      this.apiService.createRecipe(this.recipe).subscribe(
        response => {
          console.log('Recipe added successfully', response);
          this.router.navigate(['/recipes']);
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
