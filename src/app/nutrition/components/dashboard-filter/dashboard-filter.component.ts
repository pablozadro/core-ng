import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NutritionCategory } from '@/nutrition/types';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

interface CategoryOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dashboard-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './dashboard-filter.component.html',
  styleUrl: './dashboard-filter.component.scss'
})
export class DashboardFilterComponent implements OnInit {
  @Input() categories: NutritionCategory[] | null = null;
  @Output() categoryChange = new EventEmitter<string>();
  categoriesOptions: CategoryOption[] | null = null;

  selectedCategory = new FormControl('');

  ngOnInit(): void {
    if(!this.categories) return;
    this.categoriesOptions = this.categories.map(category => ({
      label: category.title,
      value: category._id,
    }));
    this.selectedCategory.valueChanges.subscribe(value => {
      this.categoryChange.emit(value || '');
    });
  }
}
