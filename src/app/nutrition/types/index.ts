export interface NutritionCategory {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionItem {
  _id: string;
  title: string;
  calories: number;
  proteins: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}