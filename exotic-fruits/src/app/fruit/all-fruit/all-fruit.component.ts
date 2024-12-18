import { Component, OnInit } from '@angular/core';
import { Fruit } from '../../types/fruits';
import { ApiService } from '../../api.service';
import { Router, RouterLink } from '@angular/router';  
import { UserService } from '../../user/user.service';

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

  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.apiService.getFruits().subscribe((fruits) => {
      this.fruits = fruits;
      this.isLoading = false;
    });
  }

  
  editFruit(fruit: Fruit) {
    this.router.navigate(['/edit-fruit', fruit._id]); 
  }

  get firstName(): string {
    return this.userService.user?.username || '';
  }

  deleteFruit(fruitId: string | undefined) {
    if (!fruitId) {
      console.error('Invalid fruit ID');
      return;
    }
  
    if (confirm('Are you sure you want to delete this fruit?')) {
      this.apiService.deleteFruit(fruitId).subscribe(
        () => {
          this.fruits = this.fruits.filter(fruit => fruit._id !== fruitId);
        },
        (error) => {
          console.error('Error deleting fruit', error);
        }
      );
    }
  }
  
}

