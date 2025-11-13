import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { HomeScreenProps } from '../navigation/types';
import { UserForm } from '../components/form/UserForm';
import heroImage from '../assets/images/hero.png';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <View style={styles.tag}>
            <Text style={styles.title}>Seguro Salud Flexible</Text>
          </View>
          <Text style={styles.subTitle}>Creado para ti y tu familia</Text>
        </View>
        <Image
          source={heroImage}
          style={styles.heroImage}
          resizeMode="contain"
          accessible
          accessibilityLabel="Imagen hero"
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.formDesc}>
          Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
          asesoría, 100% online.
        </Text>
        <UserForm navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FD',
    flexGrow: 1,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 24,
  },
  heroText: {
    flex: 1,
  },
  title: {
    color: '#03050F',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  tag: {
    backgroundColor: '#00f4e2',
    width: 150,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: '#03050F',
    marginTop: 4,
  },
  heroImage: {
    width: 136,
    height: 160,
    borderRadius: 8,
  },
  formSection: {
    borderTopColor: '#CCD1EE',
    borderTopWidth: 1,
    gap: 24,
    paddingVertical: 24,
  },
  formDesc: {
    color: '#03050F',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: '600',
  },
});

export default HomeScreen;
