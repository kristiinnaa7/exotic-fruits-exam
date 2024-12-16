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

  // Fetch a single recipe by ID (optional)
  getRecipe(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Recipe>(`${apiUrl}/recipes/${id}`);
  }
  createRecipe(recipeName: string, postText: string) {
    const { apiUrl } = environment;
    const payload = { recipeName, postText };
    return this.http.post<Recipe>(`${apiUrl}/recipes`, payload);
  }


  // getRecipes(limit?: number) {
  //   const { apiUrl } = environment;
  //   let url = `${apiUrl}/recipes`;
  //   if (limit) {
  //     url += `?limit=${limit}`;
  //   }
  //   console.log(url);
    

  //   return this.http.get<Recipe[]>(url);
  // }


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


