import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PedidosState, Pedido, Producto } from '../types';

export default function TabTwoScreen() {
  const pedidos = useSelector((state: PedidosState) => state.pedidos); // Usar RootState
  const dispatch = useDispatch();

  // Agrupar los pedidos por fecha
  const groupedPedidos: Record<string, Pedido[]> = {};
  pedidos.forEach((pedido: Pedido) => {
    const fecha = pedido.cuenta.fecha.split(' ')[0]; // Obtener solo la fecha sin la hora
    if (!groupedPedidos[fecha]) {
      groupedPedidos[fecha] = [];
    }
    groupedPedidos[fecha].push(pedido);
  });

  const [expandedFecha, setExpandedFecha] = useState<string | null>(null);
  const [expandedPedido, setExpandedPedido] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        {Object.entries(groupedPedidos)
          .reverse()
          .map(([fecha, pedidosPorFecha]) => (
            <View key={fecha} style={{ width: '100%' }}>
              <TouchableOpacity
                style={styles.fechaHeader}
                onPress={() =>
                  expandedFecha === fecha
                    ? setExpandedFecha(null)
                    : setExpandedFecha(fecha)
                }
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.fechaHeaderText}>{fecha}</Text>
                  <Text style={styles.fechaHeaderText}>
                    Total: $
                    {pedidosPorFecha.reduce(
                      (total, pedido) => total + pedido.total,
                      0
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              {expandedFecha === fecha &&
                pedidosPorFecha.map((pedido: Pedido, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.pedido}
                    onPress={() => {
                      expandedPedido === index
                        ? setExpandedPedido(null)
                        : setExpandedPedido(index);
                    }}
                  >
                    <View style={styles.pedidoHeader}>
                      <Text style={styles.pedidoTotal}>
                        Total: ${pedido.total}
                      </Text>

                      <Text style={styles.pedidoTotal}>
                        {pedido.cuenta.fecha.split(' ')[1]}
                      </Text>
                    </View>
                    {expandedPedido === index && (
                      <View style={styles.productosContainer}>
                        {pedido.cuenta.productos.map((producto: Producto) => (
                          <View key={Math.random()}>
                            <Text style={styles.pedidoTitle}>
                              {producto.nombre}
                            </Text>
                            <Text style={styles.pedidoText}>
                              Cantidad: {producto.cantidad}
                            </Text>
                            <Text style={styles.pedidoText}>
                              Precio: {producto.precio}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pedido: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomColor: '#ccc',
    marginHorizontal: 16,
    borderBottomWidth: 2,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pedidoTotal: {
    fontSize: 16,
  },
  pedidoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pedidoText: {
    fontSize: 16,
  },
  productosContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },

  fechaHeader: {
    backgroundColor: 'rgba(250,250,250,1)',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 10,
  },
  fechaHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(220,220,220,1)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
