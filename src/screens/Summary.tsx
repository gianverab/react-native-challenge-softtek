import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SummaryScreenProps } from '../navigation/types';
import { Layout } from '../components/layout/Layout';

const SummaryScreen: React.FC<SummaryScreenProps> = ({ navigation }) => {
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text>Summary Screen</Text>
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

export default SummaryScreen;
