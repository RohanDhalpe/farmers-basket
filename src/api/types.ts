import { ProductData } from "../types/type";

export interface User{
  id: number;
  user_type: string;
  token: string;
}

export interface OrderItem{
  productInfo:ProductData;
  quantity:number;
}
