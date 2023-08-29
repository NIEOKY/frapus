import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Dialog from 'react-native-dialog';

import { Text } from './Themed';
import { ProductoVenta } from '@/app/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addProductoVenta } from '@/app/features/productosSlice';
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('productos');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
const storeData = async (newValue: ProductoVenta) => {
  try {
    const existingValue = await getData();
    const combinedValue = [...(existingValue || []), newValue];
    const jsonValue = JSON.stringify(combinedValue);
    await AsyncStorage.setItem('productos', jsonValue);
  } catch (e) {
    // Manejar el error de guardado
  }
};
export default function AddProductDialog() {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAdd = async () => {
    if (nombre === '' || precio === 0) {
      return;
    }
    await dispatch(addProductoVenta({ nombre, precio }));
    await storeData({ nombre, precio });
    setNombre('');
    setPrecio(0);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.customButton} onPress={showDialog}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Añadir Producto</Dialog.Title>
        <Text>Nombre</Text>
        <Dialog.Input
          placeholder="Nombre"
          onChangeText={(text) => setNombre(text)}
          value={nombre}
        />
        <Text>Precio</Text>
        <Dialog.Input
          placeholder="Precio"
          keyboardType="numeric"
          onChangeText={(text) => setPrecio(Number(text))}
          value={precio.toString()}
        />

        <Dialog.Button label="Cancelar" onPress={handleCancel} />
        <Dialog.Button label="Añadir" onPress={handleAdd} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100000,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
    borderRadius: 40,
    marginRight: 10,
    position: 'absolute',
    //center aligns horizontally
    alignItems: 'center',
    marginTop: 30,
  },

  customButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CD442',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 40,
    color: '#ffffff',
  },
});
