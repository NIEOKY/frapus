import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import Cuenta from '../cuenta';
import { Link, router } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad?: number;
};

type Cuenta = {
  id: number;
  productos: Producto[];
  fecha: Date;
};

const productos = [
  {
    id: 1,
    nombre: 'Frape chico',
    precio: 100,
    imagen: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    nombre: 'Frape Grande',
    precio: 200,
    imagen: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    nombre: 'Frape Mediano',
    precio: 300,
    imagen: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    nombre: 'doritos queso',
    precio: 400,
    imagen: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    nombre: 'dortios chile ',
    precio: 500,
    imagen: 'https://picsum.photos/200/300',
  },
  {
    id: 6,
    nombre: 'papas queso',
    precio: 600,
    imagen: 'https://picsum.photos/200/300',
  },
  {
    id: 7,
    nombre: 'papas queso y chiles',
    precio: 700,
    imagen: 'https://picsum.photos/200/300',
  },
  {
    id: 8,
    nombre: 'cono nieve',
    precio: 800,
    imagen: 'https://picsum.photos/200/300',
  },
  {
    id: 9,
    nombre: 'canasta',
    precio: 900,
    imagen: 'https://picsum.photos/200/300',
  },
  {
    id: 10,
    nombre: 'litro de frape ',
    precio: 1000,
    imagen: 'https://picsum.photos/200/300',
  },
];

export default function TabOneScreen() {
  const [cantidad, setCantidad] = useState(0); // [valor, funcion para actualizar el valor
  const [cuenta, setCuenta] = useState<Cuenta>({
    id: 1,
    productos: [],
    fecha: new Date(),
  });

  const agregarAlCarrito = (producto: Producto) => {
    const index = cuenta.productos.findIndex((p) => p.id === producto.id);

    if (index !== -1) {
      const updatedProductos = [...cuenta.productos];
      updatedProductos[index].cantidad =
        (updatedProductos[index].cantidad || 1) + 1;
      setCuenta((prevCuenta) => ({
        ...prevCuenta,
        productos: updatedProductos,
      }));
    } else {
      setCuenta((prevCuenta) => ({
        ...prevCuenta,
        productos: [...prevCuenta.productos, { ...producto, cantidad: 1 }],
      }));
    }
    setCantidad((prevCantidad) => prevCantidad + 1);
  };

  const quitarDelCarrito = (producto: Producto) => {
    const index = cuenta.productos.findIndex((p) => p.id === producto.id);

    if (index !== -1) {
      const updatedProductos = [...cuenta.productos];
      updatedProductos[index].cantidad =
        (updatedProductos[index].cantidad || 1) - 1;

      if (updatedProductos[index].cantidad! <= 0) {
        updatedProductos.splice(index, 1);
      }

      setCuenta((prevCuenta) => ({
        ...prevCuenta,
        productos: updatedProductos,
      }));
    }

    setCantidad((prevCantidad) => prevCantidad - 1);
  };

  const calcularTotal = () => {
    return cuenta.productos.reduce(
      (total, producto) => total + producto.precio * (producto.cantidad || 1),
      0
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.grid}>
          {productos.map((producto) => (
            <TouchableOpacity
              key={producto.id}
              onPress={() => {
                agregarAlCarrito(producto);
              }}
            >
              <View style={styles.productContainer}>
                <Image style={styles.image} source={{ uri: producto.imagen }} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{producto.nombre}</Text>
                  <Text style={styles.price}>${producto.precio}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push({ pathname: '/cuenta', params: cuenta });
        }}
      >
        <Text style={{ color: '#ffffff', fontSize: 30 }}>
          Pagar ${calcularTotal()}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.ScrollCuenta}>
        {cuenta.productos.map((producto) => (
          <View style={styles.Cuenta} key={producto.id}>
            <Text style={styles.textoCuenta}>{producto.nombre}</Text>

            <Text style={styles.cantidadCuenta}>{producto.cantidad}</Text>

            <Icon
              style={{ marginLeft: 20 }}
              name="delete"
              size={30}
              color="#ed0909"
              onPress={() => {
                quitarDelCarrito(producto);
              }}
            />
          </View>
        ))}
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    fontSize: 14,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  productContainer: {
    marginVertical: 2,
    marginBottom: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 180,
    height: 180,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },
});
