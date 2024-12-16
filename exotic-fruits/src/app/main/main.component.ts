import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { HomeComponent } from '../home/home.component';
import { AllFruitComponent } from '../fruit/all-fruit/all-fruit.component';
import { RecipesComponent } from '../recipes/recipes.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomeComponent, AllFruitComponent,  RecipesComponent, ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) {}
}
