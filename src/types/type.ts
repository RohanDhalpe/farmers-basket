export interface ProductData {
    id:number;
    name: string;
    description: string;
    category: string;
    price: number;
    isSeasonal: boolean;
    quantity: number;
  }

  export interface CartItemData {
    id:number;
    name: string;
    description: string;
    category: string;
    price: number;
    isSeasonal: boolean;
    quantity: number;
  }

  export interface User{
    ID:number;
    name:string,
    email:string,
    password:string,
    phone_number:string,
    user_type:string
  }

  export interface Order{
    id:number,              
    customer_id:number,     
    product_id:number,      
    order_date:string,     
    total_amount:number, 
    payment_option:string,  
    payment_status:string   
    order_status:string,    
    order_type:string   , 
    delivery_address:string    
    quantity:number   
  }

  export interface BuyProduct{
    customer_id:number,
    product_id:number,
    payment_option:string,
    payment_status:string,
    order_status:string,
    delivery_address:string,
    order_type:string,
    quantity:number
  }