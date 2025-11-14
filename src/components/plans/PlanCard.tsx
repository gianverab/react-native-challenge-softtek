import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Plan } from '../../types';
import Button from '../ui/Button';

const PlanCard: React.FC<{ plan: Plan; onSelect: () => void }> = ({
  plan,
  onSelect,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{plan.name}</Text>
      <Text style={styles.price}>Costo del Plan: ${plan.price} al mes</Text>
      <View style={{ marginTop: 12 }}>
        {plan.description.map((d, i) => (
          <Text key={i} style={styles.desc}>
            • {d}
          </Text>
        ))}
      </View>
      {/* <TouchableOpacity style={styles.btn} onPress={onSelect}>
        <Text style={styles.btnText}>Seleccionar plan</Text>
      </TouchableOpacity> */}
      <Button
        title="Seleccionar plan"
        onPress={onSelect}
        testID="cotiza-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    minHeight: 240,
    justifyContent: 'space-between',
  },
  title: { fontSize: 20, fontWeight: '700' },
  price: { marginTop: 8, fontWeight: '700', color: '#111827' },
  desc: { marginTop: 8, color: '#374151' },
  /* btn: {
    marginTop: 12,
    backgroundColor: '#ff2d55',
    paddingVertical: 12,
    borderRadius: 28,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' }, */
});

export default PlanCard;
