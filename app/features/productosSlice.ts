import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductoVenta } from '../types';

const initialState: ProductoVenta[] = [];

const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    addProductoVenta(state, action: PayloadAction<ProductoVenta>) {
      if (state.find((producto) => producto.nombre === action.payload.nombre)) {
        //if the product is already in the list do nothing
      } else {
        state.push(action.payload);
      }
    },
    removeProductoVenta(state, action: PayloadAction<ProductoVenta>) {
      state = state.filter(
        (producto) => producto.nombre !== action.payload.nombre
      );
    },
  },
});

export const { addProductoVenta } = productosSlice.actions;

export default productosSlice.reducer;
