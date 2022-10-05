import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0, //global total
  maxQuantity: 10,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { product, quantity } = payload;

      const isItemInCart = current(state).cartItems.find(
        (item) => item.id === product.id
      );

      if (isItemInCart) {
        const addedQuantity = state.cartItems.map((item) => {
          let setTotalQuantities = item.quantity + quantity;

          if (item.quantity >= state.maxQuantity) {
            setTotalQuantities = state.maxQuantity;
          }

          return item.id === product.id
            ? { ...item, quantity: setTotalQuantities }
            : item;
        });

        state.cartItems = addedQuantity;

        return;
      }

      state.cartItems = state.cartItems.concat([{ ...product, quantity }]);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    calculateTotals: (state) => {
      const quantity = state.cartItems
        .map((items) => items.quantity)
        .reduce((prev, act) => prev + act, 0);

      const price = state.cartItems
        .map((items) => items.price * items.quantity)
        .reduce((prev, act) => prev + act, 0);

      state.quantity = quantity;
      state.price = price;
    },
  },
});

export const { clearCart, removeItem, calculateTotals, addToCart } =
  cartSlice.actions;

export const getTotal = (state) => state.cart.price;
export const getQuantities = (state) => state.cart.quantity;
export const getItems = (state) => state.cart.cartItems;
export const getMaxQuantity = (state) => state.cart.maxQuantity;

export default cartSlice.reducer;
