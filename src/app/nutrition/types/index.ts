export interface NutritionCategory {
  _id: string;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionItemFact {
  calories: number;
  protein: number;
  totalFat: number | null;
  saturatedFats: number | null;
  transFat: number | null;
  polyUnsaturatedFats: number | null;
  monoUnsaturatedFats: number | null;
  cholesterol: number | null;
  sodium: number | null;
  totalCarbohydrates: number | null;
  dietaryFiber: number | null;
  sugar: number | null;
  vitaminD: number | null;
  calcium: number | null;
  iron: number | null;
  potassium: number | null;
}

export interface NutritionItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  presentation: string;
  fact: NutritionItemFact;
  createdAt: string;
  updatedAt: string;
}

export interface GetItemsQuery {
  category?: string;
  orderBy?: string;
}

export interface GetItemsFilter {
  title?: string;
}