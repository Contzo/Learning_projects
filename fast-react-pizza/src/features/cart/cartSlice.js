import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   cart: [],
  cart: [
    {
      pizzaId: 12,
      name: "Mediterranean",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      // search the item we want to update
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++; // increase the qu
      item.totalPrice = item.quantity * item.unitPrice; // update the price
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      // search the item we want to update
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++; // decrease the quantity
      item.totalPrice = item.quantity * item.unitPrice; // update the price
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartPizzas = createSelector([getCart], (items) =>
  items.reduce((totalItems, item) => totalItems + item.quantity, 0),
);

export const getTotalCartPrice = createSelector([getCart], (items) =>
  items.reduce((totalPrice, item) => totalPrice + item.totalPrice, 0),
);

// moemoized selector
// export const getSinglePizzaQuantity = (id) =>
//   createSelector(
//     [getCart],
//     (cart) => cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
//   );

export const getSinglePizzaQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
