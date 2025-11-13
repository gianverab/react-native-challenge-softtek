import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
  style?: object;
};

export const Button: React.FC<Props> = ({
  title,
  onPress,
  disabled,
  loading,
  testID,
  style,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, disabled ? styles.disabled : null, style]}
      accessibilityRole="button">
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF1B55',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  disabled: { opacity: 0.6 },
  text: { color: '#fff', fontWeight: '600' },
});

export default Button;
