import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  testID?: string;
  error?: string | undefined;
};

export const Checkbox: React.FC<Props> = ({
  label,
  value,
  onValueChange,
  testID,
  error,
}) => {
  return (
    <>
      <TouchableOpacity
        testID={testID}
        onPress={() => onValueChange(!value)}
        activeOpacity={0.8}
        style={styles.row}>
        <View style={[styles.box, value && styles.boxChecked]}></View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </>
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
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  boxChecked: { backgroundColor: '#03050F', borderColor: '#03050F' },
  label: { fontSize: 14, lineHeight: 24, color: '#0A051E' },
  error: { color: '#e53935', marginTop: 6, fontSize: 12 },
});

export default Checkbox;
