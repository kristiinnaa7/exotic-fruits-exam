import { Component, OnInit } from '@angular/core';
import { Recipe } from '../types/recipes'; // Make sure this is defined correctly
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'] // Corrected typo: styleUrls instead of styleUrl
})
export class RecipesComponent implements OnInit {

  recipes: any
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Raw data as an example (this should be an array)
    const rawData = [
      {
        name: 'Exotic Passion Fruit and Lime Cake',
        ingredients: [
          '½ Oats',
          '¾ cup Coconut Flour',
          '2 tbsp Coconut Sugar',
          '3 tbsp Coconut Oil',
          '0.12 tsp Himalayan Salt',
          '2 tbsp Cacao Powder',
          '¼ cup Nut Milk',
          '9 tbsp Coconut Nectar',
          '1 Mango',
          '½ cup Coconut Oil',
          '2 Passion Fruit',
          '1 Lime',
        ],
        imageUrl: 'cake.jpg'
      },
      {
        name: 'Hawaiian Mimosas',
        ingredients: [
          'Coconut Rum',
          'Pineapple Juice (cold)',
          'Champagne or Prosecco (cold)',
          'Pineapple slices and/or cherries for garnish',
        ],
        imageUrl: 'Hawaiian.jpg'
      },
      {
        name: 'Tropical Fruit Salad Ingredients',
        ingredients: [
          '1 Pineapple',
          '12 Mandarins',
          '5 Kiwis',
          '3 Mangos',
          '2 cups strawberries',
          '1 Lemon',
          '¼ cup honey',
        ],
        imageUrl: 'salad.jpg'
      }
    ];

    // Now, rawData is an array, so we can directly assign it to this.recipes
    this.recipes = rawData;

    // Optionally, simulate loading completion
    this.isLoading = false;

    // If you plan to use the API service in the future, you can uncomment and use this code
    // this.apiService.getRecipes().subscribe((recipes) => {
    //   this.recipes = recipes;
    //   this.isLoading = false;
    // });
  }
}
