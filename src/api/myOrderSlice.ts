import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItem, User } from "./types";

interface MyCartState {
    Cart:OrderItem[]
}

const initialState: MyCartState = {
    Cart:[]
}

const myOrderSlice = createSlice({
    name: "myCart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ orderItem: OrderItem }>) => {
            state.Cart = [...state.Cart, action.payload.orderItem];
            console.log("state Cart : ", state.Cart); 
        },
        removeFromCart: (state, action: PayloadAction<{ productId: number }>) => {
          const productIdToRemove = action.payload.productId;
          state.Cart = state.Cart.filter(item => item.productInfo.id !== productIdToRemove);
      }
    }
});

export const { addToCart, removeFromCart } = myOrderSlice.actions;

export default myOrderSlice.reducer; 

