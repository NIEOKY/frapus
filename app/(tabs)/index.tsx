import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
type Producto = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
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
    nombre: 'Frape Extra Grande',
    precio: 400,
    imagen: 'https://picsum.photos/200/300',
  },
];

export default function TabOneScreen() {
  const [cuenta, setCuenta] = useState<Cuenta>();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {productos.map((producto) => (
          <TouchableOpacity key={producto.id}>
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
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: '#fff', fontSize: 30 }}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#4CD442',
    marginBottom: 2,
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
});
