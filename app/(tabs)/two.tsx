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
  //ahora toca separar cuantos de cada tipo de producto se vendieron en cada fecha y el total de dinero que se obtuvo en cada fecha por producto
  const cantidadProductoFecha: Record<string, Record<string, number>> = {};
  const totalProductoFecha: Record<string, Record<string, number>> = {};
  Object.entries(groupedPedidos).forEach(([fecha, pedidosPorFecha]) => {
    cantidadProductoFecha[fecha] = {};
    totalProductoFecha[fecha] = {};
    pedidosPorFecha.forEach((pedido: Pedido) => {
      pedido.cuenta.productos.forEach((producto: Producto) => {
        if (!cantidadProductoFecha[fecha][producto.nombre]) {
          cantidadProductoFecha[fecha][producto.nombre] = 0;
        }
        cantidadProductoFecha[fecha][producto.nombre] += producto.cantidad;
        if (!totalProductoFecha[fecha][producto.nombre]) {
          totalProductoFecha[fecha][producto.nombre] = 0;
        }
        totalProductoFecha[fecha][producto.nombre] +=
          producto.cantidad * producto.precio;
      });
    });
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
              <View style={{ width: '100%', marginBottom: 10 }}>
                {expandedFecha === fecha &&
                  Object.entries(cantidadProductoFecha[fecha]).map(
                    ([nombre, cantidad], index) => (
                      <View style={styles.totalContainer} key={index}>
                        <Text style={styles.totalText}>{nombre}</Text>
                        <Text style={styles.infoText}>
                          Cantidad: {cantidad}
                        </Text>
                        <Text style={styles.infoText}>
                          Total: ${totalProductoFecha[fecha][nombre]}
                        </Text>
                        <View style={styles.separator} />
                      </View>
                    )
                  )}
              </View>
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
                          <View
                            key={Math.random()}
                            style={{
                              margin: 5,
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: 'rgba(250,250,250,1)',
    borderWidth: 1,
    borderBottomColor: '#000',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '20%',
  },
  infoText: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
