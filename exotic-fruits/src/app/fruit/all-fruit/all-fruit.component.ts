import { Component, OnInit } from '@angular/core';
import { Fruit } from '../../types/fruits';
import { ApiService } from '../../api.service';
import { Router, RouterLink } from '@angular/router';  // Import Router

@Component({
  selector: 'app-all-fruit',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-fruit.component.html',
  styleUrl: './all-fruit.component.css'
})
export class AllFruitComponent implements OnInit {
  fruits: Fruit[] = [];
  isLoading = true;

  // Inject Router into the constructor
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getFruits().subscribe((fruits) => {
      this.fruits = fruits;
      this.isLoading = false;
    });
  }

  // Edit fruit functionality
  editFruit(fruit: Fruit) {
    this.router.navigate(['/edit-fruit', fruit._id]);  // Navigate to the edit page with the fruit ID
  }

  // Delete fruit functionality
  deleteFruit(fruitId: string) {
    if (confirm('Are you sure you want to delete this fruit?')) {
      this.apiService.deleteFruit(fruitId).subscribe(
        () => {
          // After successful delete, remove the fruit from the list
          this.fruits = this.fruits.filter(fruit => fruit._id !== fruitId);
        },
        (error) => {
          console.error('Error deleting fruit', error);
        }
      );
    }
  }
}

