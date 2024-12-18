import { Component, OnInit } from '@angular/core';
import { Recipe } from '../types/recipes'; 
import { ApiService } from '../api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']  
})
export class RecipesComponent implements OnInit {
  
  recipes: Recipe[] = []; 
  isLoading = true;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
        this.isLoading = false;
      }
    });
  }
   editRecipe(recipe: Recipe) {
      this.router.navigate(['/edit-recipe', recipe._id]); 
    }
  
  
    
    deleteRecipe(recipeId: string | undefined) {
      if (!recipeId) {
        console.error('Invalid recipe ID');
        return;
      }
      if (confirm('Are you sure you want to delete this recipe?')) {
        this.apiService.deleteRecipe(recipeId).subscribe(
          () => {
            this.recipes = this.recipes.filter(recipe => recipe._id !== recipeId);
          },
          (error) => {
            console.error('Error deleting recipe', error);
          }
        );
      }
    }
}

