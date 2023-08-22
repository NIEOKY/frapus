import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import CuentaScreen from '../cuentaScreen';
import { Link, router } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Cuenta,
  Pedido,
  Producto,
  ProductoVenta,
  ProductoVentaState,
} from '../types';
import { store } from '../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppState } from '../types';
import Dialog from 'react-native-dialog';
import AddProductDialog from '@/components/AddProductDialog';
import {
  addProducto,
  removeProducto,
  removeAllProductos,
  addFecha,
} from '../features/cuentaSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addPedido, removeAllPedidos } from '../features/pedidosSlice';
import {
  addProductoVenta,
  removeProductoVenta,
} from '../features/productosSlice';

const productos = [
  {
    id: 1,
    nombre: 'Frape chico',
    precio: 15,
  },
  {
    id: 2,
    nombre: 'Frape Grande',
    precio: 20,
  },
  {
    id: 3,
    nombre: 'Frape Mediano',
    precio: 30,
  },
  {
    id: 4,
    nombre: 'doritos queso',
    precio: 23,
  },
  {
    id: 5,
    nombre: 'dortios chile ',
    precio: 12,
  },
  {
    id: 6,
    nombre: 'papas queso',
    precio: 43,
  },
  {
    id: 7,
    nombre: 'papas queso y chiles',
    precio: 12,
  },
  {
    id: 8,
    nombre: 'cono nieve',
    precio: 16,
  },
  {
    id: 9,
    nombre: 'canasta',
    precio: 20,
  },
  {
    id: 10,
    nombre: 'litro de frape ',
    precio: 32,
  },
];

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('pedidos');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};
const getDataProductos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('productos');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};

const cleanData = async () => {
  try {
    await AsyncStorage.removeItem('pedidos');
  } catch (e) {}
};

//list 0f 10 random colors

export default function TabOneScreen() {
  const [visible, setVisible] = useState(false);
  // here we are going to synch pedidosreducer with asyncstorage
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const productos = useSelector((state: ProductoVentaState) => state.productos);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async (producto: ProductoVenta) => {
    await deleteProducto(producto);
    setVisible(false);
  };

  const deleteProducto = async (producto: ProductoVenta) => {
    try {
      const existingValue = await getDataProductos();
      const combinedValue = existingValue.filter(
        (p: Producto) => p.nombre !== producto.nombre
      );
      const jsonValue = JSON.stringify(combinedValue);

      await AsyncStorage.setItem('productos', jsonValue);

      await dispatch(removeProductoVenta(producto));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setPedidos(data);

        data.forEach((pedido: Pedido) => {
          store.dispatch(addPedido(pedido));
        });
      }
    });
  }, []);
  useEffect(() => {
    getDataProductos().then((data) => {
      if (data) {
        data.forEach((producto: ProductoVenta) => {
          store.dispatch(addProductoVenta(producto));
        });
      }
    });
  }, []);

  const dispatch = useDispatch();
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
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%', zIndex: 0 }}>
        <View style={styles.grid}>
          {productos.map((producto) => (
            <TouchableOpacity
              key={producto.nombre}
              onPress={() => {
                dispatch(addProducto({ ...producto, cantidad: 1 }));
              }}
              style={[styles.productContainer, ,]}
            >
              <TouchableOpacity
                onPress={showDialog}
                style={{ position: 'absolute', right: 10, top: 10 }}
              >
                <Dialog.Container visible={visible}>
                  <Dialog.Title>
                    Seguro que quieres eliminar este producto?
                  </Dialog.Title>
                  <Dialog.Button label="Cancelar" onPress={handleCancel} />
                  <Dialog.Button
                    label="Eliminar"
                    onPress={() => handleDelete(producto)}
                  />
                </Dialog.Container>
                <Icon
                  style={{ marginLeft: 20 }}
                  name="delete"
                  size={25}
                  color="#ed0909"
                />
              </TouchableOpacity>

              <Text style={styles.name}>{producto.nombre}</Text>
              <Text style={styles.price}>${producto.precio}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <AddProductDialog />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (productosEnCuenta.length > 0) {
            router.push('/cuentaScreen');
          }
        }}
      >
        <Text style={{ color: '#ffffff', fontSize: 30 }}>
          Pagar ${calcularTotal()}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.ScrollCuenta}>
        {productosEnCuenta ? (
          productosEnCuenta.map((producto) => (
            <View style={styles.Cuenta} key={producto.nombre}>
              <Text style={styles.textoCuenta}>{producto.nombre}</Text>

              <Text style={styles.cantidadCuenta}>{producto.cantidad}</Text>

              <Icon
                style={{ marginLeft: 20 }}
                name="delete"
                size={30}
                color="#ed0909"
                onPress={() => {
                  dispatch(removeProducto(producto));
                }}
              />
            </View>
          ))
        ) : (
          <Text style={{ fontSize: 20, textAlign: 'center' }}>
            No hay productos
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollCuenta: {
    width: '100%',
    height: '30%',
    backgroundColor: '#ffffff',
    borderRadius: 10,

    marginVertical: 10,
  },

  Cuenta: {
    paddingVertical: 10,
    maxheight: 50,
    marginBottom: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  textoCuenta: {
    flex: 2,
    fontSize: 20,
    color: '#000000',
  },
  cantidadCuenta: {
    borderRadius: 2,
    borderWidth: 1,
    padding: 4,
    fontSize: 20,
    color: '#05592c',
  },

  button: {
    elevation: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#4CD442',
  },

  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    borderRadius: 20,
    width: 180, // Ancho de la imagen
    height: 180, // Alto de la imagen
  },

  textContainer: {
    elevation: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: 180,
    height: 180,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    allignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  productContainer: {
    marginVertical: 10,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: '#ffffff',

    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 180,
  },

  container: {
    paddingTop: 60,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(250,250,250,1)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 20,
    backgroundColor: 'rgba(250,250,250,1)',
  },
});
