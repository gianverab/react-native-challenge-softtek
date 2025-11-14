import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ArrowLeftOffIcon from '../svg/arrow-left-off';
import ArrowRightOnIcon from '../svg/arrow-right-on';

const Stepper: React.FC<{
  step: number;
  total: number;
  onBack?: () => void;
}> = ({ step, total, onBack }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={onBack}
        accessibilityLabel="back-step"
        disabled={step === 1}>
        {step === 1 ? <ArrowLeftOffIcon /> : <ArrowRightOnIcon rotate180 />}
      </TouchableOpacity>
      <Text style={styles.stepText}>
        PASO {step} DE {total}
      </Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressInner, { width: `${(step / total) * 100}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',

    borderBottomColor: '#CCD1EE',
    borderBottomWidth: 1,
  },
  back: { fontSize: 26, color: '#6b7280' },
  stepText: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: '900',
    color: '#141938',
    letterSpacing: 0.8,
    width: 72,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#D7DBF5',
    borderRadius: 6,
    flex: 1,
  },
  progressInner: { height: 6, backgroundColor: '#4F4FFF', borderRadius: 6 },
});

export default Stepper;
