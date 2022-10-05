import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

export const LIMIT_PRODUCTS = 6;
export const PRODCUTS_URL = `https://fakestoreapi.com/products`;

export const filtersBy = { description: "description", title: "title" };

const initialState = {
  products: [],
  status: "idle", //idle | loading | succeeded | failed
  error: null,
  filtered: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (limit, thunkAPI) => {
    try {
      const response = await axios.get(`${PRODCUTS_URL}?limit=${limit}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterTitle: {
      reducer(state, { payload }) {
        const { value, type } = payload;

        let f = state.products.filter((filtersBy) => {
          if (type.length === 0 || value === "") return true;

          return type.some((key) => {
            return filtersBy[key].toLowerCase().includes(value.toLowerCase());
          });
        });

        if (f.length === 0) {
          state.products;
          return;
        }

        state.filtered = f;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date
        let days = 2;
        const loadedProducts = action.payload.map((products, index) => {
          if (index <= 1)
            products.date = sub(new Date(), { days }).toISOString();
          else products.date = new Date().toISOString();
          products.id = nanoid();
          return products;
        });

        state.products = loadedProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;
export const getFilteredProducts = (state) => state.products.filtered;

export const { filterTitle } = productsSlice.actions;
export default productsSlice.reducer;
