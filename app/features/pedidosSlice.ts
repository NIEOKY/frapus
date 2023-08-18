import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cuenta, Producto } from '../types';
import { Pedido } from '../types';

const initialState: { pedidos: Pedido[] } = {
  pedidos: [],
};

const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState,
  reducers: {
    addPedido(state, action: PayloadAction<Pedido>) {
      state.pedidos.push(action.payload);
    },
  },
});

export const { addPedido } = pedidosSlice.actions;

export default pedidosSlice.reducer;
