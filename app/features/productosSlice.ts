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
      const index = state.findIndex(
        (producto) => producto.nombre === action.payload.nombre
      );
      state.splice(index, 1);
    },
  },
});

export const { addProductoVenta, removeProductoVenta } = productosSlice.actions;

export default productosSlice.reducer;
