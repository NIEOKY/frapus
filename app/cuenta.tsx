import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';

import { Cuentatype } from './(tabs)/index';

export default function Cuenta() {
  const params = useLocalSearchParams();
  const cuenta = params;
  console.log(cuenta);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Text>hola</Text>
      </View>
    </SafeAreaView>
  );
}
