import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cuenta, Producto } from '../types';
import { Pedido } from '../types';

const initialState: Pedido[] = [];

const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState,
  reducers: {
    addPedido(state, action: PayloadAction<Pedido>) {
      state.push(action.payload);
    },
    removeAllPedidos(state) {
      state = [];
    },
  },
});

export const { addPedido, removeAllPedidos } = pedidosSlice.actions;

export default pedidosSlice.reducer;
