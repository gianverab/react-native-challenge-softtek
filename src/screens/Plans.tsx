import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { PlansScreenProps } from '../navigation/types';
import { Layout } from '../components/layout/Layout';

const PlansScreen: React.FC<PlansScreenProps> = ({ navigation }) => {
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text>Plans Screen</Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FD',
    flexGrow: 1,
  },
});
export default PlansScreen;
