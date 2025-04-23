export interface NutritionCategory {
  _id: string;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionItem {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}