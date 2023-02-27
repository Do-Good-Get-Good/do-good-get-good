import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import {Dialog} from '@rneui/base';

import colors from '../assets/theme/colors';

const LoadingOverlay = () => {
  return (
    <View style={styles.loadingOverlay}>
      <Dialog.Loading loadingProps={{color: colors.primary}} />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  loadingOverlay: {
    zIndex: 100,
    position: 'absolute',
    height: Dimensions.get('screen').height,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    opacity: 0.6,
  },
});
