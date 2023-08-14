import { View, Text, TextInput } from 'react-native';
import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';

export default function CuentaScreen() {
  const [cambio, setCambio] = React.useState(0);
  const params = useLocalSearchParams();
  const cuenta = params;
  const total: number = Number(params.total);
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
          backgroundColor: '#ffffff',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}
        onPress={() => {
          router.back();
        }}
      >
        <Text style={{ color: '#000000', fontSize: 30 }}>Pagar</Text>
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
