import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import cuentaSlice from './features/cuentaSlice';
import pedidosSlice from './features/pedidosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = configureStore({
  reducer: {
    cuenta: cuentaSlice,
    pedidos: pedidosSlice,
  },
});
