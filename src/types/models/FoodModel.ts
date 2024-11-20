export default interface FoodModel {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  totalOrder: number;
  status: number;
}
