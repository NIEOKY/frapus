import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cuenta, Producto, PedidosState } from '../types';
import { Pedido } from '../types';

const initialState: PedidosState = {
  pedidos: [
    {
      id: 0,
      cuenta: {
        productos: [],
        fecha: new Date().toLocaleDateString(),
      },
      total: 0,
    },
  ],
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
