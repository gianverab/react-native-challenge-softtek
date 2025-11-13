import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';

type Props = TextInputProps & {
  label?: string;
  error?: string | undefined;
  testID?: string;
};

export const Input: React.FC<Props> = ({ label, error, testID, ...rest }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...rest}
        testID={testID}
        style={[styles.input, error ? styles.inputError : null]}
        accessibilityLabel={label}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { fontSize: 12, lineHeight: 16, marginBottom: 6, color: '#5E6488' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: '#fff',
    height: 56,
  },
  inputError: { borderColor: '#e53935' },
  error: { color: '#e53935', marginTop: 6, fontSize: 12 },
});

export default Input;
