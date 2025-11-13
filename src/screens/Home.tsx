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
          <Text style={styles.tag}>Seguro Salud Flexible</Text>
          <Text style={styles.title}>Creado para ti y tu familia</Text>
        </View>
        <Image
          source={heroImage}
          style={styles.heroImage}
          resizeMode="contain"
          accessible
          accessibilityLabel="Imagen hero"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionDesc}>
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
    padding: 16,
    backgroundColor: '#F8F9FD',
    flexGrow: 1,
  },
  hero: {
    flexDirection: width > 700 ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  heroText: {
    flex: 1,
    marginRight: 12,
  },
  tag: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  heroImage: {
    width: width > 700 ? 220 : '100%',
    height: width > 700 ? 140 : 200,
    marginTop: width > 700 ? 0 : 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  section: {
    marginTop: 8,
  },
  sectionDesc: {
    color: '#6B7280',
    marginBottom: 12,
  },
});

export default HomeScreen;
