import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Recipe } from '../../types/recipes';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipe: Recipe | null = null;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    
    if (recipeId) {
      this.apiService.getSingleRecipe(recipeId).subscribe(
        (recipe) => {
          this.recipe = recipe;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching recipe', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('No recipe ID found in the URL');
      this.isLoading = false;
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.recipe && this.recipe._id) {
      this.apiService.updateRecipe(this.recipe._id, this.recipe).subscribe(
        (updatedRecipe) => {
          console.log('Recipe updated successfully', updatedRecipe);
          this.router.navigate(['/recipes']);
        },
        (error) => {
          console.error('Error updating recipe', error);
        }
      );
    } else {
      console.error('Form is invalid or recipe is null');
    }
  }
}
