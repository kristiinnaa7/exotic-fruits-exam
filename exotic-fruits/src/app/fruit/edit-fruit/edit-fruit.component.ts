import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Fruit } from '../../types/fruits';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-fruit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-fruit.component.html',
  styleUrls: ['./edit-fruit.component.css']
})
export class EditFruitComponent implements OnInit {
  fruit: Fruit | null = null;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const fruitId = this.route.snapshot.paramMap.get('id');
    
    if (fruitId) {
      // Fetch the fruit details from the API by ID
      this.apiService.getSingleFruit(fruitId).subscribe(
        (fruit) => {
          this.fruit = fruit;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching fruit', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('No fruit ID found in the URL');
      this.isLoading = false;
    }
  }

  // Handle form submission to update the fruit
  onSubmit(form: NgForm): void {
    if (form.valid && this.fruit) {
      this.apiService.updateFruit(this.fruit._id, this.fruit).subscribe(
        (updatedFruit) => {
          console.log('Fruit updated successfully', updatedFruit);
          this.router.navigate(['/fruits']);
        },
        (error) => {
          console.error('Error updating fruit', error);
        }
      );
    } else {
      console.error('Form is invalid or fruit is null');
    }
  }
}


