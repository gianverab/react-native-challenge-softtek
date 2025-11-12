import * as React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Header } from './Header';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  content: { flex: 1, padding: 16 },
});
