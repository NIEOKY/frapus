import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { ScrollView } from 'react-native-gesture-handler';
import react from 'react';
import { Cuenta, PedidosState, Producto } from '../types';
import { useSelector } from 'react-redux';

export default function TabTwoScreen() {
  const pedidos = useSelector((state: PedidosState) => state.pedidos);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pedidos.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pedido: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  pedidoFecha: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pedidoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pedidoText: {
    fontSize: 16,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
