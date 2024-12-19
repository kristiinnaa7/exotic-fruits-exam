import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fruit } from './types/fruits';
import { environment } from '../environments/environment.development';
import { Recipe } from './types/recipes';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getRecipes(){
  const { apiUrl } = environment;
    return this.http.get<Recipe[]>(`${apiUrl}/recipes`);
  }

  createRecipe(recipeName: Recipe,) {
    const { apiUrl } = environment;
    return this.http.post<Recipe>(`${apiUrl}/recipes`, recipeName);
  }
  getSingleRecipe(id: string){
    const { apiUrl } = environment;
    return this.http.get<Recipe>(`${apiUrl}/recipes/${id}`);
  }

  deleteRecipe(recipeId: string) {
    const { apiUrl } = environment;
    return this.http.delete(`${apiUrl}/recipes/${recipeId}`);
  }
  updateRecipe(recipeId: string, updatedRecipe: Recipe) {
    const { apiUrl } = environment;
    return this.http.put<Recipe>(`${apiUrl}/recipes/${recipeId}`, updatedRecipe);
  }

  getFruits() {
    const { apiUrl } = environment;
    return this.http.get<Fruit[]>(`${apiUrl}/fruits`);
  }

  getSingleFruit(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Fruit>(`${apiUrl}/fruits/${id}`);
  }

  createFruit(fruit: Fruit) {
    const { apiUrl } = environment;
    return this.http.post<Fruit>(`${apiUrl}/fruits`, fruit);
  }
  deleteFruit(fruitId: string) {
    const { apiUrl } = environment;
    return this.http.delete(`${apiUrl}/fruits/${fruitId}`);
  }
  updateFruit(fruitId: string, updatedFruit: Fruit) {
    const { apiUrl } = environment;
    return this.http.put<Fruit>(`${apiUrl}/fruits/${fruitId}`, updatedFruit);
  }
}


