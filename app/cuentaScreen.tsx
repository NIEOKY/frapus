import { View, Text, TextInput } from 'react-native';
import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import { AppState, Pedido, PedidosState, Producto } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllProductos, addFecha } from './features/cuentaSlice';

import pedidosSlice, { addPedido } from './features/pedidosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (newValue: Pedido) => {
  try {
    const existingValue = await getData();
    const combinedValue = [...(existingValue || []), newValue];
    const jsonValue = JSON.stringify(combinedValue);
    await AsyncStorage.setItem('pedidos', jsonValue);
  } catch (e) {
    // Manejar el error de guardado
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('pedidos');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export default function CuentaScreen() {
  const dispatch = useDispatch();
  const cuenta = useSelector((state: AppState) => state.cuenta);

  const productosEnCuenta = useSelector(
    (state: AppState) => state.cuenta.productos
  );

  const calcularTotal = () => {
    let total = 0;
    productosEnCuenta.forEach((producto: Producto) => {
      total += producto.precio * producto.cantidad;
    });
    return total;
  };
  const [cambio, setCambio] = React.useState(0);
  const total = calcularTotal();

  const calcularCambio = (dineroRecibido: number) => {
    if (dineroRecibido < total) {
      setCambio(0);
      return;
    }
    const cambio = dineroRecibido - total;
    setCambio(cambio);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 10 }}>
        Total
      </Text>
      <View style={styles.TextoDineroContainer}>
        <Text style={styles.TextoDinero}>${total}</Text>
      </View>
      <View style={styles.TextoDineroContainer}>
        <TextInput
          style={styles.TextoDinero}
          placeholder="dinero recibido"
          keyboardType="numeric"
          onChangeText={(text) => calcularCambio(Number(text))}
        />
      </View>
      <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 10 }}>
        Cambio
      </Text>
      <View style={styles.CambioContainer}>
        <Text style={styles.TextoDinero}>${cambio}</Text>
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 80,
          backgroundColor: '#4CD442',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}
        onPress={async () => {
          if (cambio <= 0) {
            return;
          }
          const now = new Date();
          const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
          await dispatch(addFecha(formattedDate));
          const pedido: Pedido = {
            cuenta: cuenta,
            total: total,
          };
          await storeData(pedido);
          await dispatch(addPedido(pedido));
          await dispatch(removeAllProductos());

          router.back();
        }}
      >
        <Text style={{ color: '#ffffff', fontSize: 30 }}>Pagar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TextoDinero: {
    fontSize: 30,
    color: '#000000',
    width: '100%',
    textAlign: 'center',
  },
  TextoDineroContainer: {
    width: '100%',
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  CambioContainer: {
    marginBottom: 60,
    width: '100%',
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
