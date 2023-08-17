import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cuenta, Producto } from '../types'; // Asegúrate de importar los tipos correctos

const initialState: Cuenta = {
  productos: [],
  fecha: new Date().toISOString(),
};

const cuentaSlice = createSlice({
  name: 'cuenta',
  initialState,
  reducers: {
    addProducto(state, action: PayloadAction<Producto>) {
      const existingProduct = state.productos.find(
        (producto) => producto.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.cantidad += 1;
      } else {
        state.productos.push({
          ...action.payload,
          cantidad: 1,
        });
      }
    },
    removeProducto(state, action: PayloadAction<Producto>) {
      const existingProduct = state.productos.find(
        (producto) => producto.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.cantidad = Math.max(existingProduct.cantidad - 1, 0);
        if (existingProduct.cantidad === 0) {
          state.productos = state.productos.filter(
            (producto) => producto.id !== action.payload.id
          );
        }
      }
    },
    addFecha(state, action: PayloadAction<string>) {
      state.fecha = action.payload;
    },
    removeAllProductos(state) {
      state.productos = [];
    },
  },
});

export const { addProducto, removeProducto, addFecha, removeAllProductos } =
  cuentaSlice.actions;

export default cuentaSlice.reducer;
