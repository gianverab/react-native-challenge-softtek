import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  testID?: string;
};

export const Checkbox: React.FC<Props> = ({
  label,
  value,
  onValueChange,
  testID,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
      style={styles.row}>
      <View style={[styles.box, value && styles.boxChecked]}></View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  boxChecked: { backgroundColor: '#FF1B55', borderColor: '#FF1B55' },
  label: { fontSize: 14, color: '#111827' },
});

export default Checkbox;
