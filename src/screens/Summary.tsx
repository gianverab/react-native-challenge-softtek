import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { Layout } from '../components/layout/Layout';
import UserGroupIcon from '../components/svg/user-group';
import Stepper from '../components/ui/Stepper';

const Summary: React.FC<{ navigation: any }> = ({ navigation }) => {
  const scrollRef = useRef<ScrollView>(null);
  const { state } = useAppContext();
  const { formData, apiUser, selectedPlan, option } = state;

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef}>
        <Stepper
          step={2}
          total={2}
          onBack={() => {
            scrollRef.current?.scrollTo({ y: 0, animated: false });
            navigation.goBack();
          }}
        />
        <Text style={styles.title}>Resumen del seguro</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.headerLabel}>Precios calculados para:</Text>
            <View style={styles.headerTitle}>
              <UserGroupIcon />
              <Text style={styles.headerName}>
                {apiUser ? `${apiUser.name} ${apiUser.lastName}` : '—'}
              </Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.cardContentRow}>
              <Text style={styles.rowTitle}>Responsable de pago</Text>
              <Text style={styles.rowText}>DNI: {formData?.dni ?? '—'}</Text>
              <Text style={styles.rowText}>
                Celular: {formData?.phone ?? '—'}
              </Text>
            </View>

            <View style={styles.cardContentRow}>
              <Text style={styles.rowTitle}>Plan elegido</Text>
              <Text style={styles.rowText}>{selectedPlan?.name ?? '—'}</Text>
              <Text style={styles.rowText}>
                Costo del Plan: $
                {selectedPlan?.finalPrice ?? selectedPlan?.price ?? '—'} al mes
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 20,
    backgroundColor: '#F8F9FD',
    flexGrow: 1,
    gap: 40,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.6,
    fontWeight: '700',
    paddingLeft: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    gap: 24,
    paddingHorizontal: 32,
    paddingVertical: 24,
    boxShadow: '0px 1px 24px 0px rgba(174, 172, 243, 0.25)',
  },
  cardHeader: {
    gap: 8,
    borderBottomColor: '#D7DBF5',
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  cardContent: {
    gap: 24,
  },
  cardContentRow: {
    gap: 8,
  },
  headerLabel: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.8,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#141938',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
  },
  headerName: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: '#141938',
  },
  rowTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#141938',
  },
  rowText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.1,
    color: '#141938',
  },
  sectionTitle: { fontWeight: '700', marginTop: 8 },
});

export default Summary;
