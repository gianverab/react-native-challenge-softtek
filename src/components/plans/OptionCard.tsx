import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import RadioCheckedIcon from '../svg/radio-checked';
import RadioEmptyIcon from '../svg/radio-empty';

type Props = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  checked: boolean;
  onPress: () => void;
  id?: string;
};

export const OptionCard: React.FC<Props> = ({
  title,
  description,
  icon,
  checked,
  onPress,
  id,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.optionCard, checked && styles.optionSelected]}
      id={id}
      aria-checked={checked}>
      <View style={styles.optionText}>
        <View style={styles.optionCheckbox}>
          {checked ? <RadioCheckedIcon /> : <RadioEmptyIcon />}
        </View>
        <View style={styles.optionTitle}>
          {icon}
          <Text style={styles.optionTitleText}>{title}</Text>
        </View>
        <Text style={styles.optionDesc}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionCard: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  optionCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  optionText: {
    gap: 8,
  },
  optionSelected: {
    borderColor: '#1f2937',
    shadowColor: '#000',
    elevation: 4,
  },
  optionTitle: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionTitleText: {
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.2,
    color: '#141938',
  },
  optionDesc: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: '#141938',
  },
});

export default OptionCard;
