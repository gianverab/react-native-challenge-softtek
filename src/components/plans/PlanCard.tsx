import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Plan } from '../../types';
import Button from '../ui/Button';
import HomeIcon from '../svg/home';
import ClinicIcon from '../svg/clinic';

const { width } = Dimensions.get('window');

const PlanCard: React.FC<{ plan: Plan; onSelect: () => void }> = ({
  plan,
  onSelect,
}) => {
  const planClinic = plan.name === 'Plan en Casa y Clínica';
  return (
    <View style={styles.card}>
      <View style={styles.topContent}>
        {planClinic && (
          <View style={styles.promoBox}>
            <Text style={styles.promoText}>Plan recomendado</Text>
          </View>
        )}
        <View style={styles.boxTitle}>
          <Text style={styles.title}>{plan.name}</Text>
          {planClinic ? <ClinicIcon /> : <HomeIcon />}
        </View>
        <View>
          <Text style={styles.priceTitle}>Costo del Plan</Text>
          <Text style={styles.priceDesc}>${plan.price} al mes</Text>
        </View>
      </View>
      <View style={styles.planDesc}>
        {plan.description.map((d, i) => (
          <Text key={i} style={styles.desc}>
            • {d}
          </Text>
        ))}
      </View>
      <Button title="Seleccionar plan" onPress={onSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 32,
    gap: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    maxWidth: width - 72,
    marginLeft: 12,
    minHeight: 600,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 32,
    letterSpacing: -0.2,
    color: '#141938',
    maxWidth: 152,
  },
  topContent: {
    gap: 16,
    borderBottomColor: '#D7DBF5',
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceTitle: {
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
    letterSpacing: 0.6,
    color: '#7981B2',
    textTransform: 'uppercase',
  },
  priceDesc: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 28,
    letterSpacing: -0.2,
    color: '#141938',
  },
  planDesc: {
    gap: 24,
    marginBottom: 16,
  },
  desc: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0.1,
    color: '#141938',
  },
  promoBox: {
    backgroundColor: '#7DF0BA',
    paddingVertical: 2,
    paddingHorizontal: 8,
    width: 'auto',
    maxWidth: 130,
    borderRadius: 6,
  },
  promoText: {
    color: '#141938',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
});

export default PlanCard;
