import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../svg/logo';

export const Header = () => (
  <View style={styles.container}>
    <Logo />
    <TouchableOpacity>
      <Text style={styles.phoneText}>📞 (01) 411 6001</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  phoneText: { fontWeight: '600', fontSize: 14 },
});
