import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Header = () => (
  <View style={styles.container}>
    <Text style={styles.phoneText}>Rimac Logo</Text>
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
