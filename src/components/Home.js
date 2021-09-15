import React from 'react';
import { View, Image } from 'react-native';

export default function Home() {

  return (
    <View style={{
      backgroundColor: '#00000010',
    }}>
      <Image source={require('../img/Logo-DGGG-13.png')} style={{width: '100%', height: '250px'}} />
    </View>
  );

}